export default async ({ $auth, redirect }) => {
  if ($auth.user && $auth.user.master) {
  } else {
    await redirect('/login')
  }
}
