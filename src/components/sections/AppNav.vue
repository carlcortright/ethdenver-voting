<template>
    <b-navbar toggleable="md" type="light" variant="faded" id="nav-custom">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand href="#"><img src="../../assets/denverlogo.png" style="max-height: 75px" alt="City of Denver Logo"></b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

        <b-nav-form>
            <b-button size="md"><i class="fa fa-plus"></i> Register New Voter</b-button>
        </b-nav-form>

        </b-navbar-nav>

    </b-collapse>
    </b-navbar>
</template>

<script>
export default {
}
</script>

<style>

.navbar{
    border-bottom: 2px solid gray;
}

.btn {
    margin: 20px;
}

</style>
