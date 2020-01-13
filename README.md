# Store

![Alt text](./ressources/Electrical-exemple.png?raw=true "Title")

---

# Technologies

## <img src="https://camo.githubusercontent.com/6effdb8103365043944db7a341e91ffe2fc234e5/68747470733a2f2f63646e2e7261776769742e636f6d2f706564726f6d616c74657a2f747970657363726970742d6c6f676f2d72656372656174696f6e2f6d61737465722f6c6f676f732f747970657363726970742d636f6c6f722d6c6f676f2e737667" alt="TypeScript logo" width="100" >



---

---

## NestJs <img src="https://d33wubrfki0l68.cloudfront.net/49c2be6f2607b5c12dd27f8ecc8521723447975d/f05c5/logo-small.cbbeba89.svg" alt="NestJs logo" width="50" >

> - Documentation : https://docs.nestjs.com/recipes/documentation
  > - compodoc : https://github.com/compodoc/compodoc

---

---

## <img src="https://www.docker.com/sites/default/files/d8/2019-07/vertical-logo-monochromatic.png" alt="Docker logo" width="50" >

---

---

## Visual Studio Code <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/1200px-Visual_Studio_Code_1.35_icon.svg.png" alt="NestJs logo" width="50" >

---
---

## Features
> - Stock
> - Download PDF of object whith link object
> - Know if I have the stock for a object
> - Know how many complete object I have in stock
> - Know what is missing for a number of complete object
> - Git repository

---
---

## User

> - firstName: string
> - lastName: string
> - email: string
> - password: string (hash)
> - roles: role[](enum)
> - objectTemplates: ObjectTemplate[]
> - object: ObjectItem[]
> - categorie: Category[]

## Category

> - name: string
> - parent: Category
> - children: Category[]
> - creators: User

## ObjectTemplate

> - name: string
> - description: string
> - parent: ObjectTemplate
> - children: ObjectTemplate[]
> - creator: User
> - objects: ObjectItem[]
> - categories: Category[]
> - stringTemplates: StringTemplateLinker[]
> - intTemplates: IntTemplateLinker[]
> -  ...

## ObjectItem

> - name: string
> - template: ObjectTemplate
> - creator: User
> - strings: StringLinker[]
> - ints: IntLinker[]
> - ...
> - objectLink: ObjectLinker[]

---

## Types to define a data :

### **String**

> StringTemplate
> - name: string (name of data)
> - required: bool (if this field is required)
> - min: int (minimum characters number)
> - max: int (maximum characters number)
> - link: bool (clickable link + open new tab)
> - history: bool (if other value of same template are show, useful for homogeneity)
> - templateLinker: StringTemplateLinker[]

> StringTemplateLinker
> - template: StringTemplate
> - objectTemplate: ObjectTemplate
> - field: int (to order data)
> - linker: StringLinker[]

> StringLinker
> - template: StringTemplateLinker
> - object: ObjectItem
> - value: string

### **Unity**
> - name: string
> - value: string
> - smart: bool (if auto adapt (0.1 m => 10 cm))
> - intTemplates: IntTemplate[]
> - floatTemplates: FloatTemplate[]

### **Int**

> IntTemplate
> - name: string (name of data)
> - required: bool (if this field is required)
> - min: int (minimum value)
> - max: int (maximum value)
> - unity: Unity
> - templateLinker: IntTemplateLinker[]

> IntTemplateLinker
> - template: IntTemplate
> - field: int (to order data)
> - linker: IntLinker[]

> IntLinker
> - template: IntTemplateLinker
> - object: ObjectItem
> - value: int

### **Float**

> FloatTemplate
> - name: string (name of data)
> - required: bool (if this field is required)
> - min: float (minimum value)
> - max: float (maximum value)
> - unity: Unity
> - templateLinker: FloatTemplateLinker[]

> FloatTemplateLinker
> - template: FloatTemplateLinker
> - field: int (to order data)
> - linker: FloatLinker[]

> FloatLinker
> - template: FloatTemplateLinker
> - object: ObjectItem
> - value: float

### **Bool**

> BoolTemplate
> - name: string (name of data)
> - required: bool (if this field is required)
> - falseLabel: string (optional)
> - trueLabel: string (optional)
> - templateLinker: BoolTemplateLinker[]

> BoolTemplateLinker
> - template: BoolTemplateLinker
> - field: int (to order data)
> - linker: BoolLinker[]

> BoolLinker
> - template: BoolTemplateLinker
> - object: ObjectItem
> - value: bool


### **Choice**

> Choice
> - value: string
> - templates: ChoiceTemplate[]

> ChoiceTemplate
> - name: string (name of data)
> - required: bool (if this field is required)
> - multiple: bool (if allow multiple values)
> - choices: Choice[] (able choices)
> - templateLinker: ChoiceTemplateLinker[]

> ChoiceTemplateLinker
> - template: ChoiceTemplateLinker
> - field: int (to order data)
> - linker: ChoiceLinker[]

> ChoiceLinker
> - template: ChoiceTemplateLinker
> - object: ObjectItem
> - index: int (to order if multiple)
> - value: Choice

### **File**

> Extension
> - value: string
> - templates: FileTemplate[]

> FileTemplate
> - name: string (name of data)
> - required: bool (if this field is required)
> - multiple: bool (if allow multiple values)
> - directory: string
> - extensions: Extension[] (able extension)
> - templateLinker: FileTemplateLinker[]

> FileTemplateLinker
> - template: FileTemplateLinker
> - field: int (to order data)
> - linker: FileLinker[]

> FileLinker
> - template: FileTemplateLinker
> - object: ObjectItem
> - index: int (to order if multiple)
> - url: string
> - name: string
> - extension: Extension

### **Object**
> ObjectLinkerTemplate
> - name: string (name of data)
> - required: bool (if this field is required)
> - multiple: bool (if allow multiple values)
> - allowChildren: bool
> - templateObjects: ObjectTemplate[]
> - templateLinker: ObjectTemplateLinker[]

> ObjectTemplateLinker
> - template: ObjectLinkerTemplate
> - field: int (to order data)
> - linker: ObjectLinker[]

> ObjectLinker
> - template: ObjectTemplateLinker
> - object: ObjectItem
> - index: int (to order if multiple)
> - objectToLink: ObjectItem

---

---

Markdown Cheatsheet : https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet
