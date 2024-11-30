import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/interfaces/products';
import { AddEditProductComponent } from '../add-edit-product/add-edit-product.component';

const listproducts: Product[] = [];

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit,AfterViewInit{

  displayedColumns: string[] = ['name', 'desc', 'price','id','acciones'];
  dataSource: MatTableDataSource<Product>;
  loading:boolean = false;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor (public dialog: MatDialog,private _productsService: ProductsService,
    private _snackBar : MatSnackBar  ){
    this.dataSource = new MatTableDataSource(listproducts);

  } 
  
  
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  ngOnInit(): void {
    this.ConsultarProduct();
  }
  

  addeditproduct(id?:number){
    const dialogRef = this.dialog.open(AddEditProductComponent, {
      width: '550px',
      disableClose:true,
      data:{id:id}
    });
    dialogRef.afterClosed().subscribe(result =>{
      if(result){
        this.ConsultarProduct()};
    })

  }

  ConsultarProduct(){
    this.loading =true;
    
    this._productsService.Consultarproduct().subscribe(element => {
      this.loading = false;
      console.log(element)
      this.dataSource.data=element
    })
  }

  deleteproduct(id:number){
    this.loading = true;
    this._productsService.deleteproduct(id).subscribe(() =>{
      this.loading = false;
      this.ConsultarProduct();
      this.deletecomplete();
    }
    )
  }
  deletecomplete(){
    this._snackBar.open("Product deleted succesfull", "",{
      duration:2000
    });
  }

}
