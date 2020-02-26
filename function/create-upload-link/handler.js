const { S3 } = require("aws-sdk")

module.exports.handler = async (event, context) => {
    try {
        const { videoName, fileType } = JSON.parse(event.body)
        const s3 = new S3();
        let returnString = "";

        if (videoName === undefined) {
            throw new Error("VideoName is undefined!")
        } else if (fileType === undefined) {
            throw new Error("File type is undefined!")
        }

        try {
            returnString = await s3.getSignedUrl('putObject', {
                Bucket: 'kudosprofileimages',
                Key: videoName + '.' + fileType,
                Expires: 300,
                ContentType: 'multipart/form-data',
                ACL: 'public-read'
            });
        } catch (e) {
            console.error(e.message);
            throw e;
        }

        return {
            statusCode: 200,
            body: {
                link: returnString
            }
        }
    } catch (error) {
        return {
            statusCode: 400,
            body: { message: "Something went wrong!" }
        }
    }
}