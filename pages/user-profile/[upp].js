const UserProfile = (props) => {
  return <h1>{ props.userProfile }</h1>
}

export async function getServerSideProps(context){
  const { params } = context;

  return {
    props: {
      userProfile : params.upp
    }
  }
}

export default UserProfile;