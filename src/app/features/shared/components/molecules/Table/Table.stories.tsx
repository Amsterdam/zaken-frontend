import React from "react"
import { Button } from "@datapunt/asc-ui"
import { ChevronRight } from "@datapunt/asc-assets/lib"
import { withKnobs, boolean } from "@storybook/addon-knobs"

import Table from "./Table"

export default {
  title: "Shared/Molecules/Table",
  decorators: [withKnobs]
}

const columns = [
  "ID",
  "First name",
  "Surname",
  "Email",
  "Gender",
  "Ip",
  undefined
]

const OpenButton: React.FC = () => <Button variant="textButton" iconSize={14} iconLeft={<ChevronRight />}>Open</Button>

const data = [
  ["1", "Dotti", "Stinchcombe", "dstinchcombe0@phpbb.com", "Female", "11.202.107.115", <OpenButton />],
  ["2", "Walden", "Vahey", "wvahey1@godaddy.com", "Male", "100.44.64.241", <OpenButton />],
  ["3", "Guss", "Trayhorn", "gtrayhorn2@wisc.edu", "Male", "79.159.29.210", <OpenButton />],
  ["4", "Brynne", "Bartosiak", "bbartosiak3@walmart.com", "Female", "16.8.52.4", <OpenButton />],
  ["5", "Cherey", "Garbutt", "cgarbutt4@bluehost.com", "Female", "97.173.26.92", <OpenButton />],
  ["6", "Wilmar", "Sirl", "wsirl5@nytimes.com", "Male", "21.229.221.20", <OpenButton />],
  ["7", "Foss", "Chaundy", "fchaundy6@weather.com", "Male", "116.245.129.212", <OpenButton />],
  ["8", "Ambur", "Newiss", "anewiss7@t.co", "Female", "119.46.226.158", <OpenButton />],
  ["9", "Augie", "Sheals", "asheals8@hugedomains.com", "Male", "10.242.30.176", <OpenButton />],
  ["10", "Hadria", "Cona", "hcona9@yandex.ru", "Female", "150.88.56.212", <OpenButton />],
  ["11", "Jody", "Dulanty", "jdulantya@4shared.com", "Female", "250.230.173.64", <OpenButton />],
  ["12", "Emmalynne", "Gatherer", "egathererb@bluehost.com", "Female", "129.111.202.112", <OpenButton />],
  ["13", "Vinny", "Alibone", "valibonec@eepurl.com", "Male", "6.73.37.101", <OpenButton />],
  ["14", "Noble", "Beidebeke", "nbeidebeked@washingtonpost.com", "Male", "189.167.179.229", <OpenButton />],
  ["15", "Roxanna", "Anfusso", "ranfussoe@ft.com", "Female", "232.99.203.0", <OpenButton />],
  ["16", "Gennifer", "Godson", "ggodsonf@ebay.com", "Female", "10.210.6.183", <OpenButton />],
  ["17", "Llywellyn", "Tummond", "ltummondg@usda.gov", "Male", "179.138.224.169", <OpenButton />],
  ["18", "Kristoffer", "Woodwind", "kwoodwindh@si.edu", "Male", "91.134.168.116", <OpenButton />],
  ["19", "Bree", "Rutley", "brutleyi@github.com", "Female", "212.198.73.187", <OpenButton />],
  ["20", "Sutherlan", "Rizzolo", "srizzoloj@unicef.org", "Male", "204.228.137.68", <OpenButton />],
  ["21", "Sharyl", "Easman", "seasmank@odnoklassniki.ru", "Female", "175.176.6.73", <OpenButton />],
  ["22", "Miller", "Bortolazzi", "mbortolazzil@chron.com", "Male", "102.203.181.185", <OpenButton />],
  ["23", "Kimberlee", "Staniland", "kstanilandm@craigslist.org", "Female", "49.5.181.89", <OpenButton />],
  ["24", "Worth", "Tebbutt", "wtebbuttn@auda.org.au", "Male", "76.155.9.106", <OpenButton />],
  ["25", "Jilli", "De Wolfe", "jdewolfeo@angelfire.com", "Female", "85.173.27.142", <OpenButton />],
  ["26", "Salomi", "Howlett", "showlettp@mysql.com", "Female", "210.7.89.5", <OpenButton />],
  ["27", "Robby", "Nono", "rnonoq@instagram.com", "Male", "191.73.143.28", <OpenButton />],
  ["28", "Renault", "Bools", "rboolsr@wsj.com", "Male", "43.85.71.140", <OpenButton />],
  ["29", "Mic", "Vitler", "mvitlers@omniture.com", "Male", "145.219.225.201", <OpenButton />],
  ["30", "Ellynn", "Vasiliev", "evasilievt@businesswire.com", "Female", "11.89.118.50", <OpenButton />],
  ["31", "Rhonda", "Fenner", "rfenneru@google.ru", "Female", "134.137.158.2", <OpenButton />],
  ["32", "Lillis", "Pogue", "lpoguev@stanford.edu", "Female", "218.187.116.65", <OpenButton />],
  ["33", "King", "Northen", "knorthenw@oakley.com", "Male", "79.27.122.187", <OpenButton />],
  ["34", "Dominick", "Fahrenbach", "dfahrenbachx@samsung.com", "Male", "48.52.247.110", <OpenButton />],
  ["35", "Arnie", "Birtley", "abirtleyy@sohu.com", "Male", "100.80.28.247", <OpenButton />],
  ["36", "Bevvy", "Falvey", "bfalveyz@discovery.com", "Female", "4.50.85.39", <OpenButton />],
  ["37", "Ave", "Scruby", "ascruby10@youtu.be", "Male", "158.47.133.36", <OpenButton />]
]

export const Example = () =>
  <div>
    <p>Example of a basic table</p>
    <Table
      columns={columns}
      data={data}
    />
  </div>

export const ExampleWithFixedColumn = () =>
  <div>
    <p>Please change viewport by clicking the 'change size of preview' button above, and see the last column acting sticky</p>
    <Table
      columns={columns}
      data={data}
      fixedColumnWidth='90px'
    />
  </div>

export const ExampleWithLoading: React.FC = () =>
  <div>
    <p>Please change loading state by toggling the knob below</p>
    <Table
      columns={columns}
      data={data}
      loading={boolean("Loading", true)}
      fixedColumnWidth='90px'
    />
  </div>


