import { useEffect, useState } from 'react';
import Layout from '@/layouts/Layout.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
import BreadcrumbComponent from '@/components/BreadcrumbComponent.tsx';
import { Card, CardContent } from '@/components/ui/card.tsx';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast.ts';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Toaster } from '@/components/ui/toaster.tsx';
import ModalEditCancelComponent from '@/components/ModalEditCancelComponet.tsx';

const userSchema = z.object({
    firstName: z.string().regex(/^[A-Za-z\s]+$/, 'O primeiro nome deve conter apenas letras'),
    lastName: z.string().regex(/^[A-Za-z\s]+$/, 'O sobrenome deve conter apenas letras'),
    email: z.string().email('Informe um e-mail válido'),
    password: z.string()
      .min(6, 'A senha deve ter no mínimo 6 caracteres')
      .regex(/^[a-zA-Z0-9]+$/, 'A senha deve ser alfanumérica'),
    role: z.enum(['ADMIN', 'COMMON'], 'Selecione um nível de acesso válido'),
    status: z.enum(['ACTIVE', 'INACTIVE'], 'Selecione um status válido'),
});

type userFormInputs = z.infer<typeof userSchema>;

const UserEdit = () => {
    const { id } = useParams();
    const [user, setUser] = useState<Partial<userFormInputs>>({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { toast } = useToast();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        async function fetchUser() {
            const token = localStorage.getItem('access_token');
            try {
                const response = await axios.get(`http://localhost:3000/users/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(response.data);
            } catch (error) {
                console.error('Erro ao buscar usuário.' + error);
            } finally {
                setLoading(false);
            }
        }
        fetchUser();
    }, [id]);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isValid }
    } = useForm<userFormInputs>({
        resolver: zodResolver(userSchema),
        mode: 'onChange'
    });

    useEffect(() => {
        if (user) {
            setValue('firstName', user.firstName || '');
            setValue('lastName', user.lastName || '');
            setValue('email', user.email || '');
            setValue('password', user.password || '');
            setValue('role', user.role || '');
            setValue('status', user.status || '');
        }
    }, [user, setValue]);

    const onSubmit = async (data: userFormInputs) => {
        const { firstName, lastName, email, password, role, status } = data;
        console.log(data)
        const formData = { firstName, lastName, email, password, role, status };
        try {
            const token = localStorage.getItem('access_token');
            await axios.put(`http://localhost:3000/users/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast({
                title: 'Dados salvos com sucesso',
                variant: 'success'
            });
            setTimeout(() => {
                navigate('/users/list');
            }, 3000);
        } catch (error) {
            toast({
                title: 'Erro ao atualizar usuário',
                variant: 'destructive'
            });
            console.error('Ocorreu um erro ao tentar atualizar' + error);
        }
    };

    const breadcrumbItems = [{ label: 'Usuários' }, { label: 'Editar Usuário' }];

    const handleCancelClick = () => {
        setIsModalOpen(true);
    };

    const handleConfirmCancel = () => {
        navigate('/users/list');
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
      <Layout>
          <Toaster />
          <BreadcrumbComponent items={breadcrumbItems} />
          <div className="flex flex-row items-center">
              <Link to="/users/list" className="text-4xl text-black p-1">
                  &lt;
              </Link>
              <h1 className="text-black text-2xl font-bold"> Editar Usuário</h1>
          </div>

          <div className="p-4">
              <div>
                  <Card>
                      <CardContent>
                          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                              Dados do Usuário
                              <div className="flex gap-x-4">
                                  <div className="w-1/2">
                                      <Input
                                        type="text"
                                        placeholder="Primeiro Nome*"
                                        {...register('firstName')}
                                        className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.firstName ? 'border-red-500 text-red-500' : watch('firstName') && 'border-b-cyan-400'}`}
                                      />
                                      {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
                                      <span className="text-xs text-black-500 float-right">• Máx. 30 Caracteres</span>
                                  </div>
                                  <div className="w-1/2">
                                      <Input
                                        type="text"
                                        placeholder="Sobrenome*"
                                        {...register('lastName')}
                                        className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.lastName ? 'border-red-500 text-red-500' : watch('lastName') && 'border-b-cyan-400'}`}
                                      />
                                      {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
                                  </div>
                              </div>
                              <Input
                                type="email"
                                placeholder="E-mail*"
                                {...register('email')}
                                className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.email ? 'border-red-500 text-red-500' : watch('email') && 'border-b-cyan-400'}`}
                              />
                              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                              <Input
                                type="password"
                                placeholder="Senha*"
                                {...register('password')}
                                className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.password ? 'border-red-500 text-red-500' : watch('password') && 'border-b-cyan-400'}`}
                              />
                              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                              <Input
                                type="text"
                                placeholder="Nível de Acesso (Admin/User)*"
                                {...register('role')}
                                className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.role ? 'border-red-500 text-red-500' : watch('role') && 'border-b-cyan-400'}`}
                              />
                              {errors.role && <p className="text-red-500">{errors.role.message}</p>}
                              <Input
                                type="text"
                                placeholder="Status (Active/Inactive)*"
                                {...register('status')}
                                className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.status ? 'border-red-500 text-red-500' : watch('status') && 'border-b-cyan-400'}`}
                              />
                              {errors.status && <p className="text-red-500">{errors.status.message}</p>}
                              <div className="flex justify-end gap-2">
                                  <Button onClick={handleCancelClick} className="bg-white text-black border">
                                      Cancelar
                                  </Button>
                                  <Button type="submit"
                                          className="bg-primary-400 text-black px-4 py-2">
                                      Salvar
                                  </Button>
                              </div>
                          </form>
                      </CardContent>
                  </Card>
              </div>
          </div>
          <ModalEditCancelComponent
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onConfirm={handleConfirmCancel}
          />
      </Layout>
    );
};

export default UserEdit;
