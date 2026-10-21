TARİHTESPİT — GERÇEK VERİ BAĞLANTISI AŞAMA 1

Bu sürüm, sayfa açıldığında Turkronicles deposundaki pairs_synonyms_new.txt dosyasını fetch() ile yükler. İnternet/kaynak erişimi başarısız olursa, kaynak dosyasından doğrulanmış sınırlı bir örnek dilim (data/pairs_sample.json) kullanılır ve durum etiketi bunu açıkça belirtir.

Canlı veri kaynağı:
https://github.com/togayyazar/Turkronicles/blob/master/pairs_synonyms_new.txt

Geniş dönemsel veri kümesi:
https://zenodo.org/records/15766757

ÖNEMLİ SINIRLAMA:
Bu ilk veri bağlantısı tarihsel/güncel sözcük eşleştirme dosyasını gösterir. Tek başına kelimelerin hangi on yılda hangi kelimelerle ne sıklıkta birlikte geçtiğini vermez. Bunun için Turkronicles n-gram dosyalarından gerekli dönemleri seçip ayrıca işlemek gerekir. Bu nedenle bu sürümde uydurma zamansal skorlar veya bağlam sıklığı grafikleri gösterilmez.

Mini test, bağlı eşleştirme dosyasından üretilir ve yalnızca kişisel prototip skorudur; toplum geneli sonucu değildir.
