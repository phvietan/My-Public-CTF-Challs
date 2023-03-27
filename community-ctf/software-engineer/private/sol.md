1) Đọc code phát hiện xài thư viện tên là @drstrain/database

2) Ai mà lười tìm hiểu sẽ vào node_modules/@drstrain/database, trong này author đã obfuscate js rồi nên méo đọc đc :D, phải lên npmjs tìm ra source của author nằm ở https://www.npmjs.com/package/@drstrain/database (và source nằm ở github https://github.com/phvietan/database)

3) Ta thấy database chỉ đơn giản là 1 class Database, có chứa object {} để store key value. Tuy nhiên database này có trường namespace và các key-value của database sẽ biến đổi như sau: (`$namespace_$key`, $value).

4) Nếu để ý thì server check .isUser = True thì không được xem flag => {}.__proto__ cũng là 1 object và thỏa điều kiện .isUser != True (vì nó undefined) => vậy chỉ cần login username = _proto__ (thiếu 1 dấu gạch dưới, do namespace của database user là rỗng) và password = undefined ta sẽ login vào đc user proto :D