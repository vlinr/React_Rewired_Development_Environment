
//处理import()无法传入变量的问题，单个导入文件，直接在外部使用
interface FilesType{
    [name:string]:()=>any
}
const Files:FilesType ={
    'Content':()=>import('@/pages/Content'),
    'NewContent':()=>import('@/pages/Content/NewContent'),
    'EditContent':()=>import('@/pages/Content/EditContent'),
    'NotFound':()=>import('@/pages/NotFound'),
    'Login':()=>import('@/pages/Login'),
    'Seo':()=>import('@/pages/Seo'),
    'Contact':()=>import('@/pages/Contact'),
    'About':()=>import('@/pages/About'),
    'Apply':()=>import('@/pages/Apply')
}
export default Files