//检查product去重
export const checkProductData = async (req, res, next) => {
    const { title, description, image, category, price } = req.body;
    const errors = [];
    for(const key in req.body){
        if(!req.body[key]){
            errors.push(`${key} is required`);
        }
    }
    if(errors.length > 0) {
        return res.status(401).json({ errors });
    }
    next();
}
