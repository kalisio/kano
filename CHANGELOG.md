# Changelog

## [Unreleased](https://github.com/kalisio/kapp/tree/HEAD)

[Full Changelog](https://github.com/kalisio/kapp/compare/2a2837264443192596b034d3b7740f7159f4c504...HEAD)

**Implemented enhancements:**

- Upgrade to Android 10 \(API 29\) [\#95](https://github.com/kalisio/kApp/issues/95)
- Migrate to the new kdk module [\#76](https://github.com/kalisio/kApp/issues/76)
-  Make testcafe tests work on CI [\#74](https://github.com/kalisio/kApp/issues/74)
- Deployment should rely on an existing MongoDB instance [\#72](https://github.com/kalisio/kApp/issues/72)
- Enhance docker build to decrease image size [\#71](https://github.com/kalisio/kApp/issues/71)
- Update drawers management [\#68](https://github.com/kalisio/kApp/issues/68)
- Generate Fastlane Appfile automatically [\#63](https://github.com/kalisio/kApp/issues/63)
- Make Travis pipeline more reliable [\#62](https://github.com/kalisio/kApp/issues/62)
- The CI/CD process should be able to manage different mobile apps according the build flavor [\#61](https://github.com/kalisio/kApp/issues/61)
- Add code to illustrate how to use a generic service to add/remove documents in the MainActivity [\#59](https://github.com/kalisio/kApp/issues/59)
- Enhance deployment method to ensure a better isolation of the app/db [\#56](https://github.com/kalisio/kApp/issues/56)
- Speed up Travis build using cache [\#54](https://github.com/kalisio/kApp/issues/54)
- Allow users to login using OAuth2 or local mode smoothly [\#53](https://github.com/kalisio/kApp/issues/53)
- Add a way to define the number of replicas when deploying an app on a Swarm infrastructure [\#51](https://github.com/kalisio/kApp/issues/51)
- Avoid deploying our own MongoDB container/backup on test and prod environments [\#49](https://github.com/kalisio/kApp/issues/49)
- Add version number and check [\#42](https://github.com/kalisio/kApp/issues/42)
- Integrate a \(container\) monitoring/management solution [\#35](https://github.com/kalisio/kApp/issues/35)
- Integrate a scaling solution [\#32](https://github.com/kalisio/kApp/issues/32)
- Integrate an online help [\#28](https://github.com/kalisio/kApp/issues/28)
- Manage deconnection [\#24](https://github.com/kalisio/kApp/issues/24)
- Add workload/stress tests [\#20](https://github.com/kalisio/kApp/issues/20)
- Add backend tests for users, organisations and events management [\#17](https://github.com/kalisio/kApp/issues/17)
- Setup frontend testing for organisation management [\#11](https://github.com/kalisio/kApp/issues/11)
- Backend config depends on frontend config [\#3](https://github.com/kalisio/kApp/issues/3)
- Migrate the template to Quasar 0.14 [\#1](https://github.com/kalisio/kApp/issues/1)

**Fixed bugs:**

- Quasar language packs installation is missing [\#92](https://github.com/kalisio/kApp/issues/92)
- Status bar hides app bar on mobiles [\#91](https://github.com/kalisio/kApp/issues/91)
- The Register page should display a link to go to the Login page [\#69](https://github.com/kalisio/kApp/issues/69)
- Cannot deploy as root [\#67](https://github.com/kalisio/kApp/issues/67)
- Add a constraint to deploy Mongodb on swarm [\#55](https://github.com/kalisio/kApp/issues/55)
- Update backup/restore db scripts [\#50](https://github.com/kalisio/kApp/issues/50)
- Tags not removed on subject when leaving an organisation [\#45](https://github.com/kalisio/kApp/issues/45)
- Tagging members requires devices field to be present [\#44](https://github.com/kalisio/kApp/issues/44)
- "More" menu not displayed under firefox [\#43](https://github.com/kalisio/kApp/issues/43)
- Error event still emitted when service call errors are catched [\#40](https://github.com/kalisio/kApp/issues/40)
- Removing the private org of a user make it access all other orgs [\#38](https://github.com/kalisio/kApp/issues/38)
- Build fails due to Uglify errors [\#37](https://github.com/kalisio/kApp/issues/37)
- Automate deployment [\#34](https://github.com/kalisio/kApp/issues/34)
- Missing icons in cards [\#29](https://github.com/kalisio/kApp/issues/29)
- Remove automated object ID population in card route handler [\#27](https://github.com/kalisio/kApp/issues/27)
- Specify the minimum version of the plateforms to be supported [\#26](https://github.com/kalisio/kApp/issues/26)
- Some collections are not correctly updated when changing user abilities [\#23](https://github.com/kalisio/kApp/issues/23)
- Abilities not correctly updated when changing tags on a member [\#22](https://github.com/kalisio/kApp/issues/22)
- Group owner not correctly registered to topic when creating a group [\#19](https://github.com/kalisio/kApp/issues/19)
- Topics for tags not correctly handled [\#18](https://github.com/kalisio/kApp/issues/18)
- Proper cleanup [\#15](https://github.com/kalisio/kApp/issues/15)
- Event management services are unreachable [\#14](https://github.com/kalisio/kApp/issues/14)
- Debug on client does not work well in vue files [\#13](https://github.com/kalisio/kApp/issues/13)
- An after hook failed when removing a group [\#12](https://github.com/kalisio/kApp/issues/12)
- OAuth2 failure should redirect to app login or error page [\#10](https://github.com/kalisio/kApp/issues/10)
- Jump to the login route does not go to home when authenticated [\#4](https://github.com/kalisio/kApp/issues/4)
- Authorisation guards on refresh prevent access [\#2](https://github.com/kalisio/kApp/issues/2)

**Closed issues:**

- Basic security measures [\#33](https://github.com/kalisio/kApp/issues/33)
- Integrate a rate-limiter to avoid DoS [\#31](https://github.com/kalisio/kApp/issues/31)
- Reverse proxy [\#30](https://github.com/kalisio/kApp/issues/30)
- Complete app configuration [\#9](https://github.com/kalisio/kApp/issues/9)
- Initiate the module [\#8](https://github.com/kalisio/kApp/issues/8)
- Move hooks from modules to app [\#7](https://github.com/kalisio/kApp/issues/7)
- Migrate to the new quasar template [\#6](https://github.com/kalisio/kApp/issues/6)
- Create a cordova application [\#5](https://github.com/kalisio/kApp/issues/5)

**Merged pull requests:**

- chore\(deps\): bump http-proxy from 1.18.0 to 1.18.1 [\#98](https://github.com/kalisio/kApp/pull/98) ([dependabot[bot]](https://github.com/apps/dependabot))
- chore\(deps\): bump showdown from 1.9.0 to 1.9.1 [\#96](https://github.com/kalisio/kApp/pull/96) ([dependabot[bot]](https://github.com/apps/dependabot))
- chore\(deps\): bump elliptic from 6.5.1 to 6.5.3 [\#94](https://github.com/kalisio/kApp/pull/94) ([dependabot[bot]](https://github.com/apps/dependabot))
- chore\(deps\): bump lodash from 4.17.15 to 4.17.19 [\#93](https://github.com/kalisio/kApp/pull/93) ([dependabot[bot]](https://github.com/apps/dependabot))
- chore\(deps\): \[security\] bump websocket-extensions from 0.1.3 to 0.1.4 [\#90](https://github.com/kalisio/kApp/pull/90) ([dependabot-preview[bot]](https://github.com/apps/dependabot-preview))
- chore\(deps\): \[security\] bump acorn from 5.7.3 to 5.7.4 [\#88](https://github.com/kalisio/kApp/pull/88) ([dependabot-preview[bot]](https://github.com/apps/dependabot-preview))
- \[Snyk\] Fix for 1 vulnerable dependencies [\#52](https://github.com/kalisio/kApp/pull/52) ([snyk-bot](https://github.com/snyk-bot))



\* *This Changelog was automatically generated by [github_changelog_generator](https://github.com/skywinder/Github-Changelog-Generator)*