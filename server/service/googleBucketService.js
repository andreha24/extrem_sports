const { Storage } = require('@google-cloud/storage');
require("dotenv").config()

const storageConfig = require("../bucketConnection");

const bucketName = process.env.BUCKETNAME;
const storage = new Storage(storageConfig);
const bucket = storage.bucket(bucketName);

class googleBucketService {
  async getImage(fileName) {
    try {
      const file = bucket.file(fileName);
      const [url] = await file.getSignedUrl({ action: 'read', expires: '01-01-2100' });
      return url;
    } catch (error) {
      console.error('Error getting image from Google Cloud Storage:', error);
      throw error;
    }
  }

  async addImage(fileBuffer, fileName) {
    try {

      const file = bucket.file(fileName);

      await file.save(fileBuffer, {
        metadata: {
          contentType: 'application/octet-stream',
        },
      });

      return `gs://${bucketName}/${fileName}`;
    } catch (error) {
      console.error('Error uploading image to Google Cloud Storage:', error);
      throw error;
    }
  }

  async editImage(oldPhoto, fileBuffer, fileName){
    try {
      await this.deleteImage(oldPhoto);
      await this.addImage(fileBuffer, fileName)
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteImage(fileName) {
    try {
      const file = bucket.file(fileName);

      const exists = await file.exists();
      if (exists[0]) {
        await file.delete();
        console.log(`Image ${fileName} deleted successfully from bucket ${bucketName}`);
      } else {
        console.log(`Image ${fileName} does not exist in bucket ${bucketName}`);
      }
    } catch (error) {
      console.error('Error deleting image from Google Cloud Storage:', error);
      throw error;
    }
  }
}


module.exports = new googleBucketService();