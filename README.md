# android_to_flutter_localizations
I created this simple app to help me automate the conversion of translations from Android xml format to Flutter dart intl. 
It is useful when migrating Android apps to Flutter.

## How to use
First install dependencies 
```bash
npm install
```
Then example run
```bash
node index.js --inputPath /android_app/app/src/main/res/values/strings.xml --outputPath ./out.dart
```

## Example of the conversion
Assume the android `strings.xml` file has the following content:

```xml
<resources>
    <string name="internal_server_error">Gjatë kërkesës tuaj ndodhi një gabim, ju lutem provoni përsëri ose kontaktoni stafin</string>
    <string name="network_error_dialog_title">Gabim teknik</string>
    <string name="network_error_dialog_message">Lidhja me internetin dështoi</string>
    
    <string-array name="months">
        <item>Janar</item>
        <item>Shkurt</item>
        <item>Mars</item>
        <item>Prill</item>
        <item>Maj</item>
        <item>Qershor</item>
        <item>Korrik</item>
        <item>Gusht</item>
        <item>Shtator</item>
        <item>Tetor</item>
        <item>Nёntor</item>
        <item>Dhjetor</item>
    </string-array>
</resources>
```

The output in my case at `lib/localization/app_localizations.dart` would be:

```dart
String get internal_server_error =>
        Intl.message('Gjatë kërkesës tuaj ndodhi një gabim, ju lutem provoni përsëri ose kontaktoni stafin', name: 'internal_server_error');
String get network_error_dialog_title =>
        Intl.message('Gabim teknik', name: 'network_error_dialog_title');
String get network_error_dialog_message =>
        Intl.message('Lidhja me internetin dështoi', name: 'network_error_dialog_message');

String get months_0 =>
        Intl.message('Janar', name: 'months_0');
String get months_1 =>
        Intl.message('Shkurt', name: 'months_1');
String get months_2 =>
        Intl.message('Mars', name: 'months_2');
String get months_3 =>
        Intl.message('Prill', name: 'months_3');
String get months_4 =>
        Intl.message('Maj', name: 'months_4');
String get months_5 =>
        Intl.message('Qershor', name: 'months_5');
String get months_6 =>
        Intl.message('Korrik', name: 'months_6');
String get months_7 =>
        Intl.message('Gusht', name: 'months_7');
String get months_8 =>
        Intl.message('Shtator', name: 'months_8');
String get months_9 =>
        Intl.message('Tetor', name: 'months_9');
String get months_10 =>
        Intl.message('Nёntor', name: 'months_10');
String get months_11 =>
        Intl.message('Dhjetor', name: 'months_11');
```
