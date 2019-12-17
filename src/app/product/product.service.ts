import { Http } from '@angular/http';
//Http servisine ulaşabilmek için yapılan importlardır. Http istek yapabilmek için response ise bize gelen yanıta karşılık gelecek nesneleri içerir.
import { Product } from "./product"; // Type safe için oluşturduğumuz product nesnesini kullanacağımız için servisimize dahil ettik.
import { Injectable, Inject } from "@angular/core";
import { Observable } from "rxjs"; // Angular http servislerinde reactjs dediğimiz paketleri kullanır. Bu paketler bize observable yani asenkron bir şekilde servis data’sına ulaşmamızı sağlar.
import { map, catchError, tap } from "rxjs/operators";

// Observable(izlenebilir) kavramından biraz bahsetmek istiyorum. Observable şunun için kullanılır; Örneğin bir servise “get” yaptığınızda o servisi sadece izlersiniz. Yani observal olur. Ne zaman siz bu servisin sonunda subscribe (abone) olursunuz, işte o zaman servise bağlanmış olursunuz. Geriye sadece response kullanarak içerideki dataya ulaşmanız kalır.
// Map : Gelen response datayı bizim istediğimiz bir nesneye map etmesi için kullanılır.
// Tap (do) : Data geldiğinde yapmasını istediğimiz işlemi anlatır.
// CatchError (catch): Bir hata olduğunda yapılmasını istediğim bir şey varsa onu yazarız.

@Injectable({
  providedIn: "root"
})
export class ProductService {
  constructor(private http: Http, @Inject('apiUrl') private apiUrl) {} // Amacımız http servisine get yaparak component’imize göndermemiz gerekiyor. Ancak bizim önce http global servisine ulaşmamız gerekiyor. Burada Angular’a http için bize bir instance(özellik) üretmesini söylüyoruz.
  //Ardından product servisimize gelerek “@Inject” ile parametre Injectable’ı kullanacağımızı belirttik. Bu parametrenin isminin “apiUrl” olduğunu ve bizim servis dosyamızda bunu “apiUrl” (buraya istediğiniz ismi verebilirsiniz) ismi ile kullanacağımızı yazdık. Yani bir değişkene atadık. Geriye sadece direkt olarak adresi yazmak yerine “this” ile değişkenimize ulaşıp “+” ile nereye ulaşmak istediğimizi yazmak yeterli oldu.
  
  getProduct(): Observable<Product[]> {
    //Burada amacımız servise observable olarak bağlamak ve component’imizin içerisinde subscribe olup dataya ulaşmak. Bu işlemi yaparken datanın bizim product nesnemizin süzgecinden geçmesini ve bize bir array dönmesini istiyoruz.
     // Yukarıda http’yi talep ettikten sonra artık “this.http” diyerek biz instance’larına ulaşabiliyoruz. Artık get ile dataya ulaşıyor, map ile de gelen response datayı bizim istediğimiz bir nesneye eklemesini istiyoruz. Return diyerek nesnemizi component’imize gönderiyoruz. Burada json yazmamızın sebebi servisi çektiğimiz data’nın XML olması. Biz data’yı response ederken onu json formatına dönüştürüyoruz.
      // return this.http
      // .get<Product>("http://newnorthwindapi.azurewebsites.net/api/products")
      // .pipe(map(response => response));
      return this.http.get(this.apiUrl + "/products")
      .pipe(map(response => response.json()));

  }
}
