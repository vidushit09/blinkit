let homepageModel={
    topTabCategoryList :[],
    leftTabCategoryList: {},
    products: {},
    
    setData: function(data) {
        this.topTabCategoryList = data.topTabCategoryList;
        this.leftTabCategoryList = data.leftTabCategories;
        this.products=data.products;
    },
    getTopTabCategoriesData: function(){
        return this.topTabCategoryList;
    },
    getLeftTabCategoriesData: function(){
        return this.leftTabCategoryList;
    },
    getLeftTabCategoriesData: function(category){
        return this.leftTabCategoryList.filter(obj=>obj.categoryName==category);
    },
    getProducts: function(){
        return this.products;
    }

}

export {homepageModel};