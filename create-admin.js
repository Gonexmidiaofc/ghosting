const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function main() {
  const email = 'ghosting.ads@gmail.com';
  const password = '@Pipoca02';
  
  const { data: listData, error: listError } = await supabase.auth.admin.listUsers();
  if (listError) {
    console.error('Error listing users:', listError);
    return;
  }
  
  let user = listData.users.find(u => u.email === email);
  
  // Exclui o usuario se ja existir para garantir que o trigger crie o profile do zero
  if (user) {
    console.log('User found in auth, deleting to recreate cleanly...');
    await supabase.auth.admin.deleteUser(user.id);
  }
  
  console.log('Creating user...');
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name: 'Admin Ghosting' }
  });
  
  if (error) {
    console.error('Error creating user:', error);
    return;
  }
  
  user = data.user;
  console.log('User created:', user.id);
  
  // Aguarda 2 segundos para o trigger do supabase criar o profile
  await new Promise(r => setTimeout(r, 2000));

  console.log('Updating profile role to super_admin...');
  const { error: profileError } = await supabase
    .from('profiles')
    .update({ role: 'super_admin' })
    .eq('id', user.id);
    
  if (profileError) {
    console.error('Error updating profile:', profileError);
  } else {
    console.log('Profile updated to super_admin successfully!');
  }
}

main();
