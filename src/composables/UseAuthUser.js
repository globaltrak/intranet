import { ref } from 'vue';
import { supabase } from 'src/boot/supabase';

const user = ref(null);

export default function useAuthUser() {
  const login = async ({ email, password }) => {
    const { user, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return user;
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const isLoggedIn = () => {
    return !!user.value;
  };

  const register = async ({ email, password, nome_completo, ...meta }) => {
    const { user, error } = await supabase.auth.signUp(
      { email, password },
      {
        data: { nome_completo, ...meta },
        redirectTo: `${window.location.origin}/me?fromEmail=registrationConfirmation`
      }
    );

    if (error) throw error;

    // Se o usuário foi criado com sucesso, tenta inserir o nome completo na tabela `profiles`
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([
        { id: user.id, full_name: nome_completo }
      ]);

    if (profileError) throw profileError;

    return user;
  };

  const update = async (data) => {
    const { user, error } = await supabase.auth.updateUser(data);
    if (error) throw error;
    return user;
  };

  const sendPasswordRestEmail = async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
  };

  // Listener para mudanças de estado da autenticação
  supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_IN' && session) {
      const { user } = session;

      // Verifica se o perfil já existe na tabela `profiles`
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (!data && !error) {
        // Cria o perfil se ele ainda não existir
        await supabase.from('profiles').insert([
          { id: user.id, full_name: user.user_metadata?.nome_completo || '' }
        ]);
      }
    }
  });

  return {
    login,
    logout,
    isLoggedIn,
    register,
    update,
    sendPasswordRestEmail,
    user
  };
}
