const Image= require('../modals/Post');
module.exports.uploadImage= async function(req,res){



  
//   try {
//     const newImage = new Image({
//       data: req.file.buffer,
//       contentType: req.file.mimetype,
//     });

//     await newImage.save();
//  console.log('image uploaded successfully');
//     return res.status(200).send({
//       success: true,
//       message: 'image uploaded successfully',
//   });
//   } catch (error) {
//     console.error('Error uploading image', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
}


module.exports.protected= function(req,res){
  console.log("protected route")
  return res.render('<h1>hdbch/</h1>');
}