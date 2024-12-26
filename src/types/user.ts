export interface CreateUserParams {
  clerkId: string;
  firstname: string;
  lastname: string;
  email: string;
}

export interface UpdateUserParams {
  userId: string;
  data: Partial<{
    firstname: string;
    lastname: string;
    email: string;
  }>;
}