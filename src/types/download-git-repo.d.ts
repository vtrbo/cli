declare module 'download-git-repo' {
  interface DownloadOptions {
    clone?: boolean;
    headers?: Record<string, any>;
  }

  interface DownloadError {
    host: string;
    hostname: string;
    method: string;
    path: string;
    protocol: string;
    url: string;
    statusCode: number;
    statusMessage: string;
    headers: Record<string, any>;
  }

  type DownloadCallback = (error: DownloadError) => void;

  export default function (
    repository: string,
    destination: string,
    options: DownloadOptions = {},
    callback: DownloadCallback
  ) {}
}
