<template>
    <div id="mountain-background">
        <div class="controls container-fluid">
            <h1>Start a New Election</h1>
            <div class="row">
              <b-form role="form"  autocomplete="off" class="col-md-6">
                <!--<h3>Election Name</h3>-->
                <!--<b-input type="text" placeholder="ex Midterm Elections 2018" require></b-input>-->
                <h3>Add Candidates</h3>
                <div class="entry input-group col-xs-3" v-for="candidate, i in candidates">
                  <input class="form-control" name="fields[]" type="text" placeholder="Candidate Name" v-model="candidate.description"/>
                  <span class="input-group-btn">
                    <button class="btn btn-success btn-add" type="button" v-on:click="addCandidate">
                      <i class="fa fa-plus"></i>
                    </button>
                    <button class="btn btn-danger btn-add" type="button" v-on:click="removeCandidate" v-show="candidates.length > 1">
                      <i class="fa fa-minus"></i>
                    </button>
                  </span>
                </div>
              </b-form>
            </div>
            <br>
            <slot></slot>
        </div>
    </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'StartElection',
  data () {
    return {
      candidates: [{
        description: ''
      }]
    }
  },
  methods: {
    addCandidate () {
      this.candidates.push({description: ''})
    },
    removeCandidate () {
      this.candidates.pop()
    }
  }
}

$(document).ready(function () {
  // $(document).on('click', '.btn-add', function (e) {
  //   e.preventDefault()
  //   var controlForm = $('.controls form:first')
  //   var currentEntry = $(this).parents('.entry:first')
  //   var newEntry = $(currentEntry.clone()).appendTo(controlForm)
  //
  //   newEntry.find('input').val('')
  //   controlForm.find('.entry:not(:last) .btn-add')
  //     .removeClass('btn-add').addClass('btn-remove')
  //     .removeClass('btn-success').addClass('btn-danger')
  //     .html('<i class="fa fa-minus"></i>')
  // }).on('click', '.btn-remove', function (e) {
  //   $(this).parents('.entry:first').remove()
  //   e.preventDefault()
  //   return false
  // })
})
</script>

<style>
#mountain-background{
    height: 100%;
    margin: 20px
}
#mountain-background button{
    width: auto;
}
.entry:not(:first-of-type)
{
    margin-top: 10px;
}
.glyphicon
{
    font-size: 12px;
}
.controls .btn {
  margin: 0px;
}
h1,
h3 {
  margin-top: 20px;
}
h1 {
  text-align: center;
}
</style>
