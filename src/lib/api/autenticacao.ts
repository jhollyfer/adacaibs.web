import { SignInPayload, SingInResponse } from "@/schemas/autenticacao";
import { AXIOS_INSTANCE } from "./axios-instance";

export class Authentication {
  static async signIn(payload: SignInPayload): Promise<SingInResponse> {
    const { data } = await AXIOS_INSTANCE.post<SingInResponse>(
      "/authentication/sign-in",
      payload
    );
    return data;
  }
}
