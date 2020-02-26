const { DynamoDB } = require("aws-sdk")

module.exports.handler = async (event, context) => {
    try {
        const docClient = new DynamoDB.DocumentClient();

        const params = {
            TableName: "videos"
        };

        const res = await docClient.scan(params);

        return {
            statusCode: 200,
            body: {
                videos: res.Items
            }
        }
    } catch (error) {
        return {
            statusCode: 400,
            body: { message: "Something went wrong!" }
        }
    }
}