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

  async editImage(topic, text, postId){
    try {
      await pool.request().query(`UPDATE Post SET topic = '${topic}' text = '${text}'  WHERE id = ${postId}`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteImage(postId){
    try {
      await pool.request().query(`DELETE FROM Post WHERE id = ${postId}`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}


module.exports = new googleBucketService();