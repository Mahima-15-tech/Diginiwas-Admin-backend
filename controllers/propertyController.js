import Property from "../models/Property.js";
import generatePropertyId from "../utils/generatePropertyId.js";

export const addProperty = async (req, res) => {
    try {
      const propertyId = await generatePropertyId();
  
      const images = req.files.map((file) => ({
        url: file.path,
        public_id: file.filename,
      }));
  
      const property = await Property.create({
        propertyId,
  
        ...req.body,
  
        images,
      });
  
      res.status(201).json({
        success: true,
        message: "Property Added Successfully",
        property,
      });
  
    } catch (error) {
  
      console.log(error);
  
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  export const getAllProperties = async (req, res) => {
    try {
      const properties = await Property.find().sort({ createdAt: -1 });
  
      res.status(200).json({
        success: true,
        count: properties.length,
        properties,
      });
    } catch (error) {
      console.log(error);
  
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  export const getPropertyById = async (req, res) => {
    try {
      const property = await Property.findById(req.params.id);
  
      if (!property) {
        return res.status(404).json({
          success: false,
          message: "Property not found",
        });
      }
  
      res.status(200).json({
        success: true,
        property,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  export const updateProperty = async (req, res) => {
    try {
      const property = await Property.findById(req.params.id);
  
      if (!property) {
        return res.status(404).json({
          success: false,
          message: "Property not found",
        });
      }
  
      Object.assign(property, req.body);
  
      if (req.files && req.files.length > 0) {
        const uploadedImages = [];
  
        for (const file of req.files) {
          const result = await cloudinary.uploader.upload(file.path, {
            folder: "diginiwas/properties",
          });
  
          uploadedImages.push({
            url: result.secure_url,
            public_id: result.public_id,
          });
        }
  
        property.images = uploadedImages;
      }
  
      await property.save();
  
      res.status(200).json({
        success: true,
        message: "Property Updated Successfully",
        property,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };


  export const deleteProperty = async (req, res) => {
    try {
      const property = await Property.findById(req.params.id);
  
      if (!property) {
        return res.status(404).json({
          success: false,
          message: "Property not found",
        });
      }
  
      for (const image of property.images) {
        if (image.public_id) {
          await cloudinary.uploader.destroy(image.public_id);
        }
      }
  
      await property.deleteOne();
  
      res.status(200).json({
        success: true,
        message: "Property Deleted Successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  export const changePropertyStatus = async (req, res) => {
    try {
      const { status } = req.body;
  
      const property = await Property.findById(req.params.id);
  
      if (!property) {
        return res.status(404).json({
          success: false,
          message: "Property not found",
        });
      }
  
      property.status = status;
  
      await property.save();
  
      res.status(200).json({
        success: true,
        message: "Status Updated",
        property,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  export const searchProperties = async (req, res) => {
    try {
      const { keyword } = req.query;
  
      const properties = await Property.find({
        $or: [
          { title: { $regex: keyword, $options: "i" } },
          { city: { $regex: keyword, $options: "i" } },
          { category: { $regex: keyword, $options: "i" } }
        ]
      });
  
      res.status(200).json({
        success: true,
        properties,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  export const filterProperties = async (req, res) => {
    try {
      const {
        city,
        category,
        transactionType,
        minPrice,
        maxPrice,
      } = req.query;
  
      let filter = {};
  
      if (city) filter.city = city;
  
      if (category) filter.category = category;
  
      if (transactionType)
        filter.transactionType = transactionType;
  
      if (minPrice || maxPrice) {
        filter.price = {};
  
        if (minPrice)
          filter.price.$gte = Number(minPrice);
  
        if (maxPrice)
          filter.price.$lte = Number(maxPrice);
      }
  
      const properties = await Property.find(filter);
  
      res.status(200).json({
        success: true,
        properties,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  export const propertyDashboard = async (req, res) => {
    try {
      const total = await Property.countDocuments();
  
      const published = await Property.countDocuments({
        status: "Published",
      });
  
      const draft = await Property.countDocuments({
        status: "Draft",
      });
  
      const sold = await Property.countDocuments({
        status: "Sold",
      });
  
      res.status(200).json({
        success: true,
        total,
        published,
        draft,
        sold,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };