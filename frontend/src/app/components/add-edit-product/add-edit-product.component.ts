import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/app/interfaces/products'; 
import { ProductsService } from 'src/app/services/products.service';


@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss']
})
export class AddEditProductComponent {

  

  form: FormGroup;
  loading:boolean = false;
  operacion:string = "Add";
  id:number | undefined ;




  constructor(public dialogRef: MatDialogRef<AddEditProductComponent>,
    private fb:FormBuilder, private _userService:ProductsService ,private _snackBar : MatSnackBar ,
     @Inject(MAT_DIALOG_DATA) public data:any){
      this.form = this.fb.group({
        name:[''],
        desc:[''], 
        price:[''],
        id:['']
      })
      this.id=data.id;

    };


  ngOnInit(): void{
    this.isEdit(this.id)
  }

  isEdit(id:number | undefined){
    if(id !== undefined){
      this.operacion = "Edit ";
      this.getProduct(id);
    }

  }
  Cancelar(){
    this.dialogRef.close(false);
  }
    /*
      nroGarage:number,
    direccion:string,
    cantLugar:number,
    valorcoch:number,
    id: number,
  */
    getProduct(id:number){
    this._userService.getproduct(id).subscribe(data =>{
      this.form.patchValue({
        name:data.name,
        desc:data.desc,
        price:data.price,
        id:data.id

      })  
    })
  }
  addEditProduct(){

    if(this.form.invalid){
      return;
    }

    const user: Product = {

      name:this.form.value.name,
      desc:this.form.value.desc,
      price:this.form.value.price,
      id:this.form.value.id

    }

    this.loading =true;
    if(this.id == undefined){
      setTimeout(()=>{
        this._userService.addproduct(user).subscribe(() =>{
          this.loading =false;
          this.addcomplete('agregado');
        })
  
      },1500)
  
    }else{
        
        this._userService.editproduct(this.id,user).subscribe(data => {
        this.addcomplete('actualizado');
        
      })
    
    }
    this.loading =false;
    this.dialogRef.close(true);



  }
  addcomplete(operacion:string){
    this._snackBar.open(`User ${operacion} con exito`, "",{
      duration:2000
    });
  }


}
