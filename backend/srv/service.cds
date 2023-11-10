service SampleUI5Uaa @(path: '/ci') @(requires: 'authenticated-user') {

    @cds.skip.persistence
    entity User {
        key userId    : String;
            firstName : String;
            lastName  : String;
    }
}
