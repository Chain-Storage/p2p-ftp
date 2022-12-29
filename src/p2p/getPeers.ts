export interface IgetPeers {
  userIp: string | any;
  userId: string | any;
}

export async function getPeers(): Promise<IgetPeers> {
  return {
    userId: "",
    userIp: "",
  };
}
