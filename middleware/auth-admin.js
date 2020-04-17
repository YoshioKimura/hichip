export default async ({ $auth, redirect }) => {
  if ($auth.user && $auth.user.role >= 2) {
  } else {
    await redirect('/login')
  }
}
