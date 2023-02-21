import {homepageModel} from "../model/homepageModel.js";
import {homepageView} from "../view/homepageView.js";

const homepageController= {
    init: function(data){
        homepageModel.setData(data);
        if(window.localStorage.getItem("cartTotal")!=undefined){
            homepageView.changeCartButton();
        }
            
        homepageView.init();
    },
    getCategories: function(){
        return homepageModel.getTopTabCategoriesData();
    },
    getleftTabCategories: function(){
        return homepageModel.getLeftTabCategoriesData();
    },
    getleftTabCategories: function(category){
        return homepageModel.getLeftTabCategoriesData(category);
    },
    getProducts: function(){
        return homepageModel.getProducts();
    },
    setProducts: function(subCategory, category, currCategory) {
        var products;
        if (category != "") {
            products = homepageModel.getProducts().filter(obj => obj.categoryName == category);
            if (subCategory != "All")
                products = products.filter(obj => obj.subCategoryName == subCategory);
    
        }
        else {
            if (subCategory != "All")
                products = homepageModel.getProducts().filter(obj => obj.subCategoryName == subCategory);
            else
                products = homepageModel.getProducts().filter(obj => obj.categoryName == currCategory);
    
        }
        return products;
    }
    

}
export {homepageController};