---
title: "Advanced rules"
slug: "docs/advanced-rule-creation"
excerpt: ""
hidden: true
createdAt: "Mon Jan 22 2024 15:03:34 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Mon Jan 22 2024 15:03:34 GMT+0000 (Coordinated Universal Time)"
sidebar:
  order: 5.22
---
The advanced rule creation page should be used by the more advanced users who want to create more specific rules. As at this time our firewall only supports PHP, we will speak of PHP and show examples in PHP below.

### Rule name

The rule name is used for displaying purposes in the different logs throughout the App and PDF reports.

### Rule conditions

The rule conditions contains the actual firewall rule. This uses a JSON format and allows you to define the different conditions to match against the request.

Each rule can contain an array of matching rules and can contain multiple conditions or chained AND conditions. The properties of each rule is as following:

#### parameter

The request parameter to match against. Below are some examples for this property value.

- post.username
  - Match against PHP $\_POST['username']  
- get.id
  - Match against PHP $\_GET['id'] 
- request.name
  - Match against PHP $\_REQUEST['name']
- files.img
  - Match against PHP $\_FILES['img']
  - If used with the matching type file_contains, will get the contents from the file
- cookie.name
  - Match against PHP $\_COOKIE['name']  
- server.HTTP_USER_AGENT
  - Match against PHP $\_SERVER['HTTP_USER_AGENT']  
- raw
  - Match against a raw POST payload (typically sent as JSON)
  - If it's base64 encoded, it will be automatically base64 decoded
  - If it's JSON encoded, it will be automatically JSON decoded
- rules
  - A special property that contains multiple rules to match against

Wildcard matching is possible as well if the field name is dynamic or you want to match against multiple fields. This can be done by inserting the asterisk character at the end of the parameter name. 

- post.test.test1\*
  - Match against $\_POST['test']['test12'], $\_POST['test']['test13'], etc
  - Each field would have its value run against the rule

#### mutations

Mutations can be applied to transform a certain request value to something else. For example, a base64 encoded value may have to be decoded first in order to figure out what it contains. The order you supply the mutations is important as that is the order it will be applied.

Below are the possible mutations.

- [json_encode](https://www.php.net/json_encode)
- [json_decode](https://www.php.net/json_decode)
- [base64_decode](https://www.php.net/base64_decode)
- [intval](https://www.php.net/intval)
- [urldecode](https://www.php.net/urldecode)
- getArrayValues
  - Custom function that casts all array values to a string in the format of key=value&key=value
  - Useful if you want to find a certain value in complex multi-dimensional arrays

#### match

The matching type to perform. This property has 2 of its own properties: type and value.

The type property is the matching type to perform while value is the property to match against.  
Below are the possible matching types.

- [equals](https://www.php.net/manual/en/language.operators.comparison.php)
  - Loose comparison using ==
- [equals_strict](https://www.php.net/manual/en/language.operators.comparison.php)
  - Strict comparison using ===
- [more_than](https://www.php.net/manual/en/language.operators.comparison.php)
  - Comparison using >
- [less_than](https://www.php.net/manual/en/language.operators.comparison.php)
  - Comparison using \<
- [isset](https://www.php.net/isset)
  - Only determine if the parameter is set
- ctype_special
  - Special custom function that removes spaces, dashes and underscores and then determines if it's a ctype_alnum. 
- [ctype_digit](https://www.php.net/ctype_digit)
  - If ctype_digit function returns true/false
- [ctype_alnum](https://www.php.net/ctype_alnum)
  - If ctype_alnum function returns true/false
- [is_numeric](https://www.php.net/is_numeric)
  - If is_numeric function returns true/false
- [contains / stripos](https://www.php.net/stripos)
  - if stripos function returns true
- [not_contains](https://www.php.net/stripos)
  - if stripos function returns false
- quotes
  - Using stripos, determine if the value contains a single or double quote
- [regex](https://www.php.net/preg_match)
  - If preg_match returns 1
- [current_user_cannot](https://developer.wordpress.org/reference/functions/current_user_can/)
  - If current_user_can WP function returns false
- [in_array](https://www.php.net/in_array)
  - If given value is in array list
- [not_in_array](https://www.php.net/in_array)
  - If given value is not in array list. Uses !in_array internally.
- [array_in_array](https://www.php.net/array_intersect)
  - If array_intersect returns non-empty result set
  - If given array has any of its values in user input array
- array_key_value
  - Extract another instance of “parameter” and match against its key
  - Can be used for JSON encoded payloads that you decode using a mutation and then need to find a certain value in the array
- general_xss
  - Using the [wp_kses_post](https://developer.wordpress.org/reference/functions/wp_kses_post/) function, determine if the content changes (thus it could imply that a XSS payload was present.) This is just a general way of detecting XSS but will not catch all scenarios and ultimately relies on the WordPress function.
- inline_xss
  - Using a custom function, determine if the value contains either a single or double quote and then determine if it also contains an equal (=) sign or a bigger than (>) sign. This can detect certain inline HTML attribute injection payloads.
- hostname
  - Retrieves the hostname of the parameter value and matches it with the hostname that is returned by the extension
- file_contains
  - If the parameter is a file, it will get the file contents and determine if the file contains a certain substring

### Rule examples

**Check if a value ($\_GET[’user’]) is not in an array**

```json
[
 {
    "parameter":"get.user",
    "match":{
       "type":"not_in_array",
       "value":[
          "admin"
       ]
    }
 }
]
```

**Check if the URL matches a regex**

```json
[
 {
    "parameter":"server.REQUEST_URI",
    "match":{
       "type":"regex",
       "value":"\/(\\\/something\\\/)\/msi"
    }
 }
]
```

**Check if a value ($\_GET[’id’]) is not a number or is less than 100**

```json
[
 {
    "parameter":"get.pid",
    "match":{
       "type":"ctype_digit",
       "value":false
    }
 },
 {
    "parameter":"get.pid",
    "match":{
       "type":"less_than",
       "value":100
    }
 }
]
```

**Check if a query parameter (test) is present in the URL**

```json
[
 {
    "parameter":"get.test",
    "match":{
       "type":"isset"
    }
 }
]
```

**Check if $\_POST[’backdoor’] == mybackdoor and user-agent contains some_backdoor_agent**

```json
[
 {
    "parameter":"post.backdoor",
    "match":{
       "type":"equals",
       "value":"mybackdoor"
    },
    "inclusive":true
 },
 {
    "parameter":"server.HTTP_USER_AGENT",
    "match":{
       "type":"contains",
       "value":"some_backdoor_agent"
    },
    "inclusive":true
 }
]
```

**Check if $\_POST[’payload’] contains a base64(json()) encoded payload with user_role array key equaling to administrator**

```json
[
 {
    "parameter":"post.payload",
    "mutations":[
       "base64_decode",
       "json_decode"
    ],
    "match":{
       "type":"array_key_value",
       "key":"user_role",
       "match":{
          "type":"equals",
          "value":"administrator"
       }
    }
 }
]
```

**Check if $\_GET[’action’] or $\_POST[’action’] contains a value part of an array of values AND if the user is not an administrator**

```json
[
 {
    "parameter":"rules",
    "rules":[
       {
          "parameter":"get.action",
          "match":{
             "type":"in_array",
             "value":[
                "restaurant_system_customize_button",
                "restaurant_system_insert_dialog"
             ]
          }
       },
       {
          "parameter":"post.action",
          "match":{
             "type":"in_array",
             "value":[
                "restaurant_system_customize_button",
                "restaurant_system_insert_dialog"
             ]
          }
       }
    ],
    "inclusive":true
 },
 {
    "parameter":false,
    "match":{
       "type":"current_user_cannot",
       "value":"administrator"
    },
    "inclusive":true
 }
]
```

**Check if the user’s IP address is in a list (e.g. whitelist)**

Note that the server.ip parameter is a special computed property and retrieves the IP address through the extension that is attached to the library. This IP grabbing function can be adjusted to your needs.

```json
[
 {
    "parameter":"server.ip",
    "match":{
       "type":"in_array",
       "value":[
          "127.0.0.1"
       ]
    }
 }
]
```

**Check if a certain value is present anywhere in the request ($\_GET, $\_POST, $\_SERVER[’REQUEST_URI’], raw POST data)**

```json
[
 {
    "parameter":"all",
    "mutations":[
       "getArrayValues"
    ],
    "match":{
       "type":"regex",
       "value":"\/(\\\/something\\\/)\/msi"
    }
 }
]
```

**Check if an uploaded file ($\_FILES[’img’]) contains \<?php in the contents**

```json
[
 {
    "parameter":"files.img",
    "match":{
       "type":"file_contains",
       "match":{
          "type":"contains",
          "value":"<?php"
       }
    }
 }
]
```

### Testing rules on sandbox environment

Although the Patchstack App itself has a way to test rules, you can also send HTTP request directly to our sandbox environment in order to determine if the rule you made works as intended.

Send a POST request to [https://firewall-sandbox.patchstack.com/](<>) with the rule and request_json parameter.

Example is to send a POST request to that URL with _rule_ set to the following.

```json
[  
 {  
    "parameter":"get.test",  
    "match":{  
       "type":"isset"  
    }  
 }  
]
```

And the _request_json_ parameter set to the following.

```json
{  
    "SERVER": {  
        "HTTP_USER_AGENT": "FireFox123 ABadBot Edge"  
    },  
    "GET": {  
        "test": 123  
    },  
    "POST": {  
        "id": 123  
    }  
}
```

This will result in the following response from the sandbox environment.

```json
{  
    "success": true,  
    "return_value": true  
}
```

If you change the "test" property in the request json to "test123" then the "return_value" will be false.

```json
{  
    "success": true,  
    "return_value": false  
}
```

### Request data for testing on sandbox

This field is used for the rule testing functionality. You can test your rules before you deploy them to your sites. This field contains a JSON object with the SERVER, GET and POST properties which are in turn converted to $\_SERVER, $\_GET and $\_POST superglobals.  
<br><br>

The example below will set $\_SERVER['HTTP_USER_AGENT'] to FireFox123 ABadBot Edge, $\_GET['id'] to 123 and $\_POST['id'] to 123.

```json
{
  "SERVER": {
    "HTTP_USER_AGENT": "FireFox123 ABadBot Edge"
  },
  "GET": {
    "id": 123
  },
  "POST": {
    "id": 123
  }
}
```

You can also send the authorization of the current request for testing the current_user_cannot matching type. This can be done in the role parameter. The example below will assume the current authorization of the user is administrator. This will match against the value specified of the current_user_cannot matching value.<br>

If you would like to pass a raw POST payload, you can do so with the "raw" parameter. Make sure to escape the double quotes as it will be a JSON payload as string.

```json
{
  "SERVER": {
    "HTTP_USER_AGENT": "FireFox123 ABadBot Edge"
  },
  "GET": {
    "id": 123
  },
  "POST": {
    "id": 123
  },
  "COOKIE": {
    "some_cookie": "cookie_value"
  },
  "role": "administrator",
  "raw": "{\"a\":\"bbbb\", \"customer_id\":999}"
}
```
