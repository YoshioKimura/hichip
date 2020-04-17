export default async ({ $auth, redirect }) => {
  if ($auth.user && $auth.user.admin) {
  } else {
    await redirect('/login')
  }
}
