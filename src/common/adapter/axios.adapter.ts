import { Injectable } from "@nestjs/common";
import axios, { AxiosInstance } from "axios";
import { HttpAdapter } from "../interfaces/http-adapter.interface";

// La idea de esta clase adaptaora sea un emboltorio que ayude que si axios cambia solo se cambia esta clase.

@Injectable()
export class AxiosAdapter implements HttpAdapter {

    private  axios: AxiosInstance = axios;
    async get<T>(url: string): Promise<T> {
        try {
            const {data} = await this.axios.get<T>(url)
            return data;
        } catch (error) {
            throw new Error('This is an error - Check logs');
        }
    }

}