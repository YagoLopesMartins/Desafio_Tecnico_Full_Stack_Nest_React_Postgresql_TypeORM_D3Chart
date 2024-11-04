import React, { useEffect, useState, useRef } from 'react';
import Layout from '@/layouts/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import TitleComponent from '@/components/TitleComponent';
import { useNavigate } from 'react-router-dom';
import { fetchUserStats } from '@/services/userService';
import * as d3 from 'd3';

interface UserStats {
    activeAdmins: number;
    cancelledAdmins: number;
    activeCommon: number;
    cancelledCommon: number;
}
const Home: React.FC = () => {
    const [userStats, setUserStats] = useState<UserStats | null>(null);
    const navigate = useNavigate();
    const chartRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            navigate('/login');
            return;
        }

        const loadStats = async () => {
            try {
                const stats = await fetchUserStats();
                if (stats) {
                    setUserStats(stats);
                }
            } catch (error) {
                console.error('Erro ao carregar estatísticas:', error);
            }
        };

        loadStats();
    }, [navigate]);

    useEffect(() => {
        if (userStats) {
            renderChart(userStats);
        }
    }, [userStats]);

    const renderChart = (data: UserStats) => {
        if (!chartRef.current) return;

        const svg = d3.select(chartRef.current);
        const width = 500;
        const height = 300;
        const margin = { top: 20, right: 30, bottom: 40, left: 50 };
        const chartWidth = width - margin.left - margin.right;
        const chartHeight = height - margin.top - margin.bottom;

        svg.attr('width', width).attr('height', height);

        // Limpa o gráfico antes de renderizar novamente
        svg.selectAll('*').remove();

        const chartData = [
            { label: 'Ativos Admin', value: data.activeAdmins },
            { label: 'Cancelados Admin', value: data.cancelledAdmins },
            { label: 'Ativos Comum', value: data.activeCommon },
            { label: 'Cancelados Comum', value: data.cancelledCommon },
        ];

        const x = d3
          .scaleBand()
          .domain(chartData.map(d => d.label))
          .range([0, chartWidth])
          .padding(0.2);

        const y = d3
          .scaleLinear()
          .domain([0, d3.max(chartData, d => d.value) || 0])
          .nice()
          .range([chartHeight, 0]);

        const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

        // Adiciona eixos
        g.append('g')
          .attr('transform', `translate(0,${chartHeight})`)
          .call(d3.axisBottom(x))
          .selectAll('text')
          .attr('transform', 'rotate(-40)')
          .style('text-anchor', 'end');

        g.append('g').call(d3.axisLeft(y));

        // Renderiza as barras
        g.selectAll('.bar')
          .data(chartData)
          .enter()
          .append('rect')
          .attr('class', 'bar')
          .attr('x', d => x(d.label)!)
          .attr('y', d => y(d.value))
          .attr('width', x.bandwidth())
          .attr('height', d => chartHeight - y(d.value))
          .attr('fill', '#4A90E2');
    };

    const date = new Date();
    const formattedDate = new Intl.DateTimeFormat('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(date);

    return (
      <Layout>
          <TitleComponent>Home</TitleComponent>
          <div className="p-4">
              <Card className="card-height">
                  <CardHeader>
                      <CardTitle className="font-bold text-2xl">Olá, usuário!</CardTitle>
                      <CardDescription>{formattedDate}</CardDescription>
                  </CardHeader>
                  <CardContent>
                      <div className="flex justify-center items-center">
                          <h1 className="buttonWelcome py-4 px-36 text-2xl font-bold">
                              Bem-vindo ao Desafio Full Stack
                          </h1>
                      </div>
                      <div className="p-4">
                          <h2 className="font-bold text-2xl">Gráfico de Usuários</h2>
                          <svg ref={chartRef}></svg>
                      </div>
                  </CardContent>
              </Card>
          </div>
      </Layout>
    );
};

export default Home;
