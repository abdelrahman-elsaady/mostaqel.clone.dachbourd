
export type usersStatisticsType = {
  message: string,
  freelancerCount: number,
  clientCount: number,
  offersCount: number,
  projectsCount: number

}



export type freelancerType = {
  message: string,
freelancers: [
  {
    _id: string,
    email: string,
    isVerify: string,
    firstName: string,
    lastName: string,
    avatar?: string,
    isActive: string
  }
]
}


export type clientsType = {
message: string,
clients: [
{
  _id: string,
  email: string,
  isVerified: string,
  firstName: string,
  lastName: string,
  avatar?: string,
  isActive: string
}
]
}
