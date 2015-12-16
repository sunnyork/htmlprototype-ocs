# OCS 3.0 prototype / file list

## HTML

### global

* page.0 template / [00template.html](00template.html)
* page.10 login / [10.html](10.html)
* page.500 error mssage / [err.html](err.html)

### inside

* page.11 question management / [11j.html](11j.html)

question query (AJAX GET) / request
  ```PARAM
  keyword {str} // keyword of question
  rowSize {num} // qty. of pages in pagination
  toPage {num} // destination page
  ```
question query / response
  ```PARAM
  {
    "pagination" : { // {obj} pagination param.
      "current" : 1, // {num} current page
      "startPage" : 1, // {num} fist page(number)of pagination
      "pagesLength" : 10, // {num} pages to show in pagination
      "finalPage" : 16 // {num} total qty. of pages (in this query)
    },
    "dataObj" :{ // {obj} query result
      "ID00001" : { // {str} question ID
        "desc" : "blah blah", // {str} question description
        "date" : "2014/12/25" // {date/str} established date
      },
      // etc......
    }
  }
  ```

delete question (AJAX POST) / request
  ```PARAM
  exam-id {str} question ID
  ```

delete question / response
  ```PARAM
  {str} result

  case: 1 success

  case: 0 fail
  ```

replace question (AJAX POST)/ request
  ```PARAM
  exam-file {file} new questions(*.xls)
  exam-id {str} exam id of the question to be replaced
  ```

* page.12 upload question / [12j.html](12j.html)
* page.13 upload examinee / [13.html](13.html)

### manager

* page.21 questions overview / [21j.html](21j.html)

delete exam (AJAX POST) / request
  ```PARAM
  id {str} id of the exam to be removed
  ```

delete exam / response
  ```PARAM
  {str} result
  case: 1 success
  case: 0 fail
  ```

re-send exam invitation (AJAX POST) / request
  ```PARAM
  id {str} id of the exam
  ```

re-send exam invitation / response
  ```PARAM
  {str} result
  case: 1 success
  case: 0 fail
  ```

* page.21a question detail / [21a.html](21a.html)
* page.22 booking exam / [22j.html](22j.html)
* page.22a booking exam ~ result / [22aj.html](22aj.html)

form submit (POST)
  ```PARAM
  (exam info)
  examDuration {num} time limit (min.)
  examStartDate {date} eg:2014/12/01
  dxamEndDate {date} eg:2014/12/31
  examineeList[] {arr} examinee list by id, eg: ['a001','a001','a003']

  (questions detail)
  questionBrand[] {arr} brand id of vehicle maker, eg: ['brand001','brand002']
  questionCount[] {arr} question qty.
  questionLevel[] {arr} question level
  ```

### examinee

* page.31 exams overview / [31.html](31.html)
* page.31a exam ~ before / [31a.html](31a.html)
* page.31b exam ~ testing / [31b.html](31b.html)
* page.31c exam ~ result / [31c.html](31c.html)
* page.31d exam result detail(form mail) / [31d.html](31d.html)

## CSS

* bootstrap.min.css / bootstrap core [bootstrap.min.css](bootstrap.min.css)
* ocs30.css / O.C.S. main style [ocs30.css](ocs30.css)
* starRate.css / js plugin starRate [starRate.css](starRate.css)
* datepicker3.css / 3-rd party js plugin datepicker [datepicker.css](datepicker.css)

## JS

### plugin

* modalInit / v1.0 [modalInit.js](modalInit.js)
* rowAccess / v1.0 [rowAccess.js](rowAccess.js)
* starRate / v1.0 [starRate.js](starRate.js)

### 3rd-party plugin

* datepicker(calendar) / [bootstrap-datepicker.js](bootstrap-datepicker.js)
* js validate / v1.13.1 [jquery.validate.min.js](jquery.validate.min.js)
* validate using bootstrap-tooltip / v0.5 [jquery-validate.bootstrap-tooltip](jquery-validate.bootstrap-tooltip)

### in page

* in-page js files / [11.js](11.js),[21.js](21.js),[22.js](22.js),[31c.js](31c.js),

### others

* bootstrap / v3.2.0 [bootstrap.min.js](bootstrap.min.js)
* ie8 media query hack / v3.7.2 [html5shiv.min.js](html5shiv.min.js), v1.4.2[respond.min.js](respond.min.js)
* ie10 viewport hack / [ie10-viewport-bog-wordaround.js](ie10-viewport-bog-wordaround.js)
* jquery / v1.11.1 [jqery.min.js](jqery.min.js)