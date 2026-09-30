export class Url {

  baseUrl: string;
  create: string;
  getExperiments: string;
  update: string;
  login: string;

  constructor() {
    this.baseUrl = Url.getBaseUrl();
    this.create = `${this.baseUrl}api/v1/experiments/create`;
    this.getExperiments = `${this.baseUrl}api/v1/experiments/get/all`;
    this.update = `${this.baseUrl}api/v1/experiments/update`;
    this.login = `${this.baseUrl}auth/login`;
  }

  static getBaseUrl(): string {
    // Optional escape hatch: set REACT_URL if the frontend and API
    // ever get split across different origins/ports.
    //const envUrl = (import.meta as any)?.env?.REACT_URL;
    //if (envUrl) return envUrl;
    return `${window.location.origin}/`;
  }

  deleteUrl(name: string): string {
    return `${this.baseUrl}api/v1/experiments/delete/${name}`;
  }
}
