// Oluşturduğumuz product nesnesini ve oluşturduğumuz observable servisi kullabilmek için iki adet import gerçekleştirdik. 
// {Component,OnInit} CLI ile component oluşturduktan sonra gelen kavramlar. Component’in zaten ne olduğu hakkında fikriniz vardır ama 
// OnInit’i biraz açıklayalım. Angular CLI İçinde bulunan ngOnInit() adında fonksiyonunu kullanmanız için bize OnInit adında bir arayüzü(interface) 
// component’timize dahil ediyor (implemets). ngOnInit component açıldığında çalışan ilk fonksiyondur. ngOnChance’den sonra gelen ikinci lifecycle eventidir. 
// Burada getProduct’ı OnInit’e tanımlayarak component açıldığı anda ilk bu fonksiyonu çalıştırmasını istiyoruz.

import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from './product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [ProductService] //Servisimizi kendimiz local olarak çektiğimiz için provider’i componentimizin içerisine yazdık. Eğer observable olan asenkron data’mızı her yerde kullanmak isteseydik, app.modul’ün içerisinde bulunan provider kısmına yazacaktık.
})
export class ProductComponent implements OnInit {

  products: Product[]; // Bizim servisten gelen değerlere ulaşmamız için oluşturduğumuz product array nesnesini product adında bir değişkene atadık.
  addedProduct: string;
  constructor(private productService: ProductService) { } // Çektiğimiz servisi component’in içerisinde kullanmak için onu constructor bloğuna enjekte etmemiz gerekiyor. Angular kendi içerisinde dependency injection(bağımlılık enjeksiyonu) mekanizmasına sahip. Dolayısıyla http’de yaptığımız gibi productService değişkenine ProductService’i atadık. Bu sayede artık “this.productService” diyerek servisimizde bulunan “getProducts” ‘a erişebilliriz

  ngOnInit() {
    this.getProduct();
  }

  getProduct() { // “.subscribe” ile asenkron olan operasyonumuza abone olduk. Gelen response datasını bizim product’ımızın içine atadık. Artık servis ve component arasındaki bağlantı hazır. getProduct() fonksiyonunu düzenli görünmesi için bu şekilde yazdık.
    this.productService.getProduct().subscribe(response => {
      this.products = response;
    });
  }

  addToCard(product: Product){  // “product: Product” yazmamızın sebebi; butona tıkladığımız zaman bize parametre olarak product gelecek. Yani “parametre product olacak ve alacağım parametre tipini de product olarak bekliyorum” demek istedik.
    this.addedProduct = product.productName;
  }

}
