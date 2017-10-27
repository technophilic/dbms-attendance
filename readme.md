# REST API documentation :

## Routes :

### ```/signup``` -
**Method**: ```POST```

**Param**:
```
{
    name:String,
    username:{type:String,required:true},
    password:{type:String,required:true},
}
```

### ```/login``` -
**Method**:```POST```

**Param**:
```
{
    username:{type:String,required:true},
    password:{type:String,required:true},
}
```