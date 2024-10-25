const useCheckLoggedIn = () => {
  const user = JSON.parse(localStorage.getItem('JWT_Token'));

  return !!user;
}

export default useCheckLoggedIn;