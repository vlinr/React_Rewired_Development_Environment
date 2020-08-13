
import Request from '@/request/Request';
import { UPLOAD_FILE_URL } from '@/config/api.config';
async function uploadFile(file: File, url: string, token: string | null): Promise<any> {
    let formData: FormData = new FormData();
    formData.append('file', file);
    return await new Request({
        api: UPLOAD_FILE_URL + url + `?token=${token}`,
        method: 'post',
        dataType: '',
        data: formData,
        useCustomHeader: false,
    }).fetch();
}
export default uploadFile;