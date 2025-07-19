export class CreateTwitterDto {
    text: string;
    media_ids?: string[];
}

export class UploadMediaDto {
    file: Buffer;
    mime_type: string;
}
