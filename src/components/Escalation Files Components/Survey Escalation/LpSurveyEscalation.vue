<template>
  <a-config-provider :locale="enUS">
    <!-- header with inputs -->
    <div class="sticky top-0 z-40 shadow">
      <!-- Title container -->
      <div class="bg-white flex justify-center">
        <h2 class="text-2xl font-semibold py-1 mt-2">Lifepoints Survey Escalation</h2>
      </div>

      <!-- Escalation info Inputs Container -->
      <div class="inputs-container bg-white py-3 flex justify-around">
        <div class="w-10/12 flex justify-around inputs-container">
          <div class="flex justify-center items-center font-semibold px-9">
            <p>Escalation Info:</p>
          </div>

          <!-- Subject Input -->
          <a-input
            placeholder="Escalation Subject"
            v-model="lpSurveyEscalationStore.newSubject"
            allow-clear
            :style="{ width: '340px' }"
          />

          <!-- Ticket received Input -->
          <a-input
            v-model="lpSurveyEscalationStore.newTicketsReceived"
            placeholder="# tickets received"
            allow-clear
            :max-length="9"
            :style="{ width: '340px' }"
          />

          <!-- Country Input -->

          <a-select
            placeholder="Country Select"
            allow-clear
            allow-search
            v-model="lpSurveyEscalationStore.newCountriesAffected"
            multiple
            :style="{ width: '340px' }"
          >
            <a-option>Argentina</a-option>
            <a-option>Australia</a-option>
            <a-option>Austria</a-option>
            <a-option>Belgium</a-option>
            <a-option>Brazil</a-option>
            <a-option>Canada</a-option>
            <a-option>Chile</a-option>
            <a-option>China</a-option>
            <a-option>Colombia</a-option>
            <a-option>Czech</a-option>
            <a-option>Denmark</a-option>
            <a-option>Finland</a-option>
            <a-option>France</a-option>
            <a-option>Germany</a-option>
            <a-option>Greece</a-option>
            <a-option>Hong Kong</a-option>
            <a-option>Hungary</a-option>
            <a-option>India</a-option>
            <a-option>Indonesia</a-option>
            <a-option>Ireland</a-option>
            <a-option>Italy</a-option>
            <a-option>Japan</a-option>
            <a-option>Malaysia</a-option>
            <a-option>Mexico</a-option>
            <a-option>Netherlands</a-option>
            <a-option>New Zealand</a-option>
            <a-option>Norway</a-option>
            <a-option>Peru</a-option>
            <a-option>Philippines</a-option>
            <a-option>Poland</a-option>
            <a-option>Portugal</a-option>
            <a-option>Romania</a-option>
            <a-option>Russia</a-option>
            <a-option>Singapore</a-option>
            <a-option>South Africa</a-option>
            <a-option>South Korea</a-option>
            <a-option>Spain</a-option>
            <a-option>Sweden</a-option>
            <a-option>Switzerland</a-option>
            <a-option>Taiwan</a-option>
            <a-option>Thailand</a-option>
            <a-option>Turkey</a-option>
            <a-option>UK</a-option>
            <a-option>US</a-option>
            <a-option>Vietnam</a-option>
          </a-select>

          <!-- Add row button -->
          <a-button type="primary" @click="addEscalationInfo()" :style="{ width: '100px' }">
            <template #icon>
              <icon-edit />
            </template>
            <template #default>Set</template>
          </a-button>
        </div>
      </div>

      <!-- Issues and what we need Inputs Container -->
      <div class="inputs-container bg-white py-3 flex justify-center">
        <div class="w-10/12 flex justify-around inputs-container">
          <div class="flex justify-center items-center font-semibold">
            <p>Issues and what we need:</p>
          </div>

          <!-- Points Issues input -->
          <a-select
            v-model="lpSurveyEscalationStore.newPointsIssues"
            :style="{ width: '340px' }"
            placeholder="Select points issue(s)"
            allow-clear
            multiple
          >
            <a-option>Points not received after completion of survey</a-option>
            <a-option>Received less points than promised</a-option>
            <a-option>Webcam points not received</a-option>
            <a-option>Points deducted after completion (SET COMPLETED)</a-option>
            <a-option>Other</a-option>
          </a-select>

          <!-- Technical Issues input -->
          <a-select
            v-model="lpSurveyEscalationStore.newTechnicalIssues"
            :style="{ width: '340px' }"
            placeholder="Select technical issue(s)"
            allow-clear
            multiple
          >
            <a-option>Survey link doesn't work</a-option>
            <a-option>Received error message</a-option>
            <a-option>Blank page</a-option>
            <a-option>No "none of the above" or "prefer not to answer" option</a-option>
            <a-option>Survey froze</a-option>
            <a-option>Won't accept my response</a-option>
            <a-option>No submit button</a-option>
            <a-option>Survey in wrong language</a-option>
            <a-option>Survey disappeared from dashboard</a-option>
            <a-option>Survey will not allow member to restart</a-option>
            <a-option>Ongoing survey shows already completed message</a-option>
            <a-option>Survey asked for username/password</a-option>
            <a-option>Audio/Video not working</a-option>
            <a-option>No responses available</a-option>
            <a-option
              >Completed a substantial portion of the survey but wasn't able to complete</a-option
            >
            <a-option>Other</a-option>
          </a-select>

          <!-- What we need input -->
          <a-select
            v-model="lpSurveyEscalationStore.newWhatWeNeed"
            :style="{ width: '340px' }"
            placeholder="Select what we need"
            allow-clear
            multiple
          >
            <a-optgroup label="Points">
              <a-option>Confirm full reconciliation will be completed</a-option>
              <a-option
                >Including members who completed a substantial portion of the survey</a-option
              >
              <a-option>Confirm date reconciliation will be completed</a-option>
              <a-option>Will points be returned to account</a-option>
            </a-optgroup>

            <a-optgroup label="Technical">
              <a-option>Is this a survey issue or likely an issue on the member's side?</a-option>
              <a-option>if it's a survey issue, will technical issue be fixed? If so:</a-option>
              <a-option>Can members pick up where they left off/restart survey</a-option>
              <a-option>Will new survey invite be sent</a-option>
              <a-option>Will members be credited</a-option>
              <a-option>When will LPs be credited</a-option>
            </a-optgroup>
          </a-select>

          <!-- Add row button -->
          <a-button type="primary" @click="addIssues()" :style="{ width: '100px' }">
            <template #icon>
              <icon-edit />
            </template>
            <template #default>Set</template>
          </a-button>
        </div>
      </div>

      <!-- Examples Inputs Container -->
      <div class="inputs-container bg-white py-3 flex justify-around">
        <div class="flex justify-center items-center font-semibold">
          <p>Add examples:</p>
        </div>

        <!-- Ticket Input -->
        <a-input
          placeholder="Ticket ID"
          :max="7"
          v-model="lpSurveyEscalationStore.newRow.ticket"
          allow-clear
          :max-length="7"
          :style="{ width: '300px' }"
        />

        <!-- CINT ID Input -->
        <a-input
          v-model="lpSurveyEscalationStore.newRow.cintID"
          placeholder="CINT ID"
          allow-clear
          :max-length="10"
          :style="{ width: '300px' }"
        />

        <!-- Date Received Input  -->
        <a-date-picker
          format="MM-DD-YYYY"
          placeholder="Date received"
          v-model="lpSurveyEscalationStore.newRow.dateReceived"
          :style="{ width: '300px' }"
        />

        <!-- Panelist wrote Input -->
        <a-input
          v-model="lpSurveyEscalationStore.newRow.panelistWrote"
          placeholder="Panelist wrote"
          allow-clear
          :style="{ width: '300px' }"
        />

        <!-- Add row button -->
        <a-button type="primary" @click="addNewRow()" :style="{ width: '100px' }">
          <template #icon>
            <icon-plus />
          </template>
          <template #default>Add</template>
        </a-button>
      </div>
    </div>

    <!-- Table with data -->
    <div>
      <!-- Escalation info display -->
      <div class="bg-white flex justify-center">
        <div>
          <!-- Escalation subject -->
          <div class="flex">
            <h2 class="text-xl font-semibold py-2">Escalation Subject:</h2>
            <h2 class="text-xl py-2 ml-1 text-red-500 font-semibold italic">
              {{ lpSurveyEscalationStore.subject }}
            </h2>
          </div>

          <!-- Number of tickets received -->
          <div class="flex">
            <h2 class="text-base py-2">Number of tickets received:</h2>
            <h2 class="text-base py-2 ml-1 text-red-500 font-semibold italic">
              {{ lpSurveyEscalationStore.ticketsReceived }}
            </h2>
          </div>

          <!-- Countries affected -->
          <div class="flex">
            <h2 class="text-base py-2">Country(s) affected:</h2>
            <h2
              class="text-base py-2 ml-1 text-red-500 font-semibold italic"
              v-for="country in lpSurveyEscalationStore.countriesAffected"
              :key="country"
            >
              {{ country }},
            </h2>
          </div>

          <!-- Points issue -->
          <div>
            <h2 class="text-lg py-2 font-semibold">POINTS ISSUE(s):</h2>
            <h2
              class="text-sm py-2 ml-1 text-red-500 font-semibold italic"
              v-for="pointsIssue in lpSurveyEscalationStore.pointsIssues"
              :key="pointsIssue"
            >
              •{{ pointsIssue }}
            </h2>
          </div>

          <!-- Technical issue -->
          <div>
            <h2 class="text-lg py-2 font-semibold">TECHNICAL ISSUE(s):</h2>
            <h2
              class="text-sm py-2 ml-1 text-red-500 font-semibold italic"
              v-for="technicalIssue in lpSurveyEscalationStore.technicalIssues"
              :key="technicalIssue"
            >
              •{{ technicalIssue }}
            </h2>
          </div>

          <!-- What we need -->
          <div>
            <h2 class="text-lg py-2 font-semibold">WHAT WE NEED FROM YOU/YOUR TEAM:</h2>
            <h2
              class="text-sm py-2 ml-1 text-red-500 font-semibold italic"
              v-for="whatNeed in lpSurveyEscalationStore.whatWeNeed"
              :key="whatNeed"
            >
              •{{ whatNeed }}
            </h2>
          </div>
        </div>
      </div>
      <table
        class="mx-auto mt-4 h-auto bg-white rounded-t-lg shadow mb-4"
        data-cols-width="30,30,30,30"
        ref="lpSurveyEscalationTable"
      >
        <thead>
          <!-- Escalation info spreadsheet -->
          <div class="hidden">
            <tr>
              <th>Hello,</th>
            </tr>
            <!-- Blank space -->
            <tr>
              <td></td>
            </tr>

            <!-- Number of tickets received -->
            <tr>
              <th data-f-bold="true">Number of tickets received:</th>
              <td data-f-bold="true" data-f-color="FF0000" data-a-h="center">
                {{ lpSurveyEscalationStore.ticketsReceived }}
              </td>
            </tr>

            <!-- Blank space -->
            <tr>
              <td></td>
            </tr>

            <!-- Countries affected -->
            <tr>
              <th data-f-bold="true">Country(s) affected:</th>
              <td data-f-bold="true" data-f-color="FF0000" data-a-h="center">
                <p v-for="country in lpSurveyEscalationStore.countriesAffected" :key="country">
                  {{ country }},
                </p>
              </td>
            </tr>

            <!-- Blank space -->
            <tr>
              <td></td>
            </tr>

            <!-- Blank space -->
            <tr>
              <td></td>
            </tr>

            <!-- Points issues -->
            <tr>
              <th data-f-bold="true">POINTS ISSUE(s)</th>
            </tr>

            <tr v-for="pointsIssue in lpSurveyEscalationStore.pointsIssues" :key="pointsIssue">
              <td>• {{ pointsIssue }}</td>
            </tr>

            <!-- Blank space -->
            <tr>
              <td></td>
            </tr>

            <!-- Points issues -->
            <tr>
              <th data-f-bold="true">TECHNICAL ISSUE(s)</th>
            </tr>

            <tr
              v-for="technicalIssue in lpSurveyEscalationStore.technicalIssues"
              :key="technicalIssue"
            >
              <td>• {{ technicalIssue }}</td>
            </tr>

            <!-- Blank space -->
            <tr>
              <td></td>
            </tr>

            <!-- What we need -->
            <tr>
              <th data-f-bold="true">WHAT WE NEED FROM YOU/YOUR TEAM:</th>
            </tr>

            <tr>
              <td data-f-bold="true" data-f-color="FF0000">
                Please respond back with the following information
              </td>
            </tr>

            <tr v-for="whatNeed in lpSurveyEscalationStore.whatWeNeed" :key="whatNeed">
              <td>• {{ whatNeed }}</td>
            </tr>

            <!-- Blank space -->
            <tr>
              <td></td>
            </tr>
          </div>

          <!-- Tickets examples -->
          <div class="flex items-center">
            <h2 class="font-semibold py-4 ml-2 mt-2">Ticket(s) Examples:</h2>
          </div>

          <tr>
            <th data-f-bold="true">Ticket ID</th>
            <th data-f-bold="true">Panelist ID</th>
            <th data-f-bold="true">Date received</th>
            <th data-f-bold="true">Panelist wrote:</th>

            <th data-exclude="true">
              <div class="flex justify-center">
                <p>Edit</p>
                <a-tooltip
                  content="You can edit any value by clicking on it. Then to update it, simply click on the 'Update' button."
                >
                  <vue-feather type="info" size="13" class="ml-1"></vue-feather>
                </a-tooltip>
              </div>
            </th>
            <th data-exclude="true">Delete</th>
          </tr>
        </thead>

        <tbody v-for="row in lpSurveyEscalationStore.rows" :key="row.id">
          <tr class="border">
            <td data-label="TICKET ID">
              <a-input v-model="row.ticket" :max-length="7" />
              <p class="hidden">{{ row.ticket }}</p>
            </td>

            <td data-label="PANELIST ID">
              <a-input v-model="row.cintID" :max-length="7" />
              <p class="hidden">{{ row.cintID }}</p>
            </td>

            <td data-label="DATE RECEIVED">
              <a-input v-model="row.dateReceived" />
              <p class="hidden">{{ row.dateReceived }}</p>
            </td>

            <td data-label="PANELIST WROTE">
              <a-input v-model="row.panelistWrote" />
              <p class="hidden">{{ row.panelistWrote }}</p>
            </td>

            <td data-label="EDIT" data-exclude="true">
              <a-button
                type="primary"
                @click="
                  editRow();
                  $notification.success('Value updated successfully!');
                "
              >
                <template #icon>
                  <icon-edit />
                </template>

                <template #default>Update</template>
              </a-button>
            </td>

            <td data-label="DELETE" data-exclude="true">
              <a-popconfirm
                content="Are you sure ?"
                oktext="Yes"
                @ok="
                  $notification.success('Row deleted successfully!');
                  deleteRow(row.id);
                "
              >
                <a-button type="primary">
                  <template #icon>
                    <icon-delete />
                  </template>
                  <template #default>Delete</template>
                </a-button>
              </a-popconfirm>
            </td>
          </tr>

          <!-- Spreadsheet footer -->
          <div class="hidden">
            <!-- Blank space -->
            <tr>
              <td></td>
            </tr>

            <!-- Info -->
            <tr>
              <td>
                Could you please take a look into this survey and advise how best to respond to our
                panelist(s)?
              </td>
            </tr>

            <!-- Blank space -->
            <tr>
              <td></td>
            </tr>

            <!-- Info -->
            <tr>
              <td>Thanks so much for your help with this study!</td>
            </tr>
          </div>
        </tbody>
      </table>

      <!-- Empty data display -->
      <div
        class="bg-white mx-auto mt-1 empty_data mb-4"
        v-show="lpSurveyEscalationStore.rows.length === 0"
      >
        <a-empty />
      </div>

      <!-- Floating button -->
      <div class="absolute bottom-10 z-50 mb-10 ml-10">
        <FloatingMenu
          @clear-data="openModal()"
          @download-data="
            convertTable(lpSurveyEscalationTable, `${lpSurveyEscalationStore.subject}`)
          "
        />
      </div>

      <!-- Delete confirmation Modal -->
      <a-modal
        v-model:visible="visible"
        @ok="
          clearAllRows();
          $notification.success('All data has been deleted!');
        "
      >
        <template #title> Warning! </template>
        <div>All data will be permanently deleted, are you sure you want to proceed?</div>
      </a-modal>
    </div>
  </a-config-provider>
</template>

<script setup>
// Import EN language for Arco Library
import enUS from "@arco-design/web-vue/es/locale/lang/en-us";

// Import Arco Library Icons
import {
  IconPlus,
  IconDelete,
  IconDownload,
  IconBug,
  IconBulb,
  IconClose,
  IconMessage,
  IconEdit,
  IconSettings,
  IconRefresh,
} from "@arco-design/web-vue/es/icon";

// Vue imports
import { onMounted, ref } from "@vue/runtime-core";

// Components import
import FloatingMenu from "../../FloatingMenu.vue";
import WeekDisplay from "../../WeekDisplay.vue";

// Stores import
import { useUserStore } from "../../../stores/userInfo";
import { weekStore } from "../../../stores/weekStore";
import { useLpSurveyEscalationStore } from "../../../stores/Escalation_Files_Stores/Survey Escalation_Stores/lpSurveyEscalation";

//Composables import
import getUser from "../../../composables/getUser";
import convertTableToExcel from "../../../composables/convertTableToExcel";

// Stores variables
const storeWeek = weekStore();
const storeUser = useUserStore();
const lpSurveyEscalationStore = useLpSurveyEscalationStore();

// Destructuring userInfo composable
const { userInfo } = getUser();

// Table to excel destructuring
const { convertTable } = convertTableToExcel();

// Target the table
const lpSurveyEscalationTable = ref(null);

// Modal display status
const visible = ref(false);

const openModal = () => {
  visible.value = true;
};

// Clear input fields on component mount
onMounted(async () => {
  clearInputFields();
});

// Function to clear the input fields
function clearInputFields() {
  lpSurveyEscalationStore.newRow.ticket = "";
  lpSurveyEscalationStore.newRow.cintID = "";
  lpSurveyEscalationStore.newRow.dateReceived = "";
  lpSurveyEscalationStore.newRow.panelistWrote = "";
  lpSurveyEscalationStore.newSubject = "";
  lpSurveyEscalationStore.newTicketsReceived = "";
  lpSurveyEscalationStore.newCountriesAffected = "";
  lpSurveyEscalationStore.newPointsIssues = "";
  lpSurveyEscalationStore.newTechnicalIssues = "";
  lpSurveyEscalationStore.newWhatWeNeed = "";
}

// Function to add new row to the table
function addNewRow() {
  lpSurveyEscalationStore.$patch((state) => {
    state.newRow.id = Math.floor(Math.random() * 10000);
    state.rows.push(state.newRow);
    state.newRow = {
      ticket: "",
      cintID: "",
      dateReceived: "",
      panelistWrote: "",
    };
    state.hasChanged = true;
  });
}

// Function to add escalation info
function addEscalationInfo() {
  lpSurveyEscalationStore.$patch((state) => {
    state.subject = state.newSubject;
    state.ticketsReceived = state.newTicketsReceived;
    state.countriesAffected = state.newCountriesAffected;
    state.newSubject = "";
    state.newTicketsReceived = "";
    state.newCountriesAffected = "";
    state.hasChanged = true;
  });
}

// Function to add issues and what we need
function addIssues() {
  lpSurveyEscalationStore.$patch((state) => {
    state.pointsIssues = state.newPointsIssues;
    state.technicalIssues = state.newTechnicalIssues;
    state.whatWeNeed = state.newWhatWeNeed;
    state.newPointsIssues = "";
    state.newTechnicalIssues = "";
    state.newWhatWeNeed = "";
    state.hasChanged = true;
  });
}

// Function to edit a row
function editRow() {
  lpSurveyEscalationStore.$patch((state) => {
    state.selectedRow = state.rows.indexOf(state.newRow);
    state.newRow = {};
    state.hasChanged = true;
  });
}

// Function to delete a row
function deleteRow(id) {
  lpSurveyEscalationStore.$patch((state) => {
    state.rows = state.rows.filter((row) => row.id !== id);
    state.hasChanged = true;
  });
}

// Function to clear all rows
function clearAllRows() {
  lpSurveyEscalationStore.$patch((state) => {
    state.rows = [];
    state.subject = "";
    state.ticketsReceived = "";
    state.countriesAffected = "";
    state.pointsIssues = "";
    state.technicalIssues = "";
    state.whatWeNeed = "";
    state.hasChanged = true;
  });
}
</script>

<style scoped>
/* Table styles */
table,
.empty_data {
  width: 97%;
}
th,
td {
  margin: 1rem;
  padding: 1rem;
}
.footer {
  width: 20%;
}

.button-trigger {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 55px;
  height: 55px;
  color: var(--color-white);
  font-size: 14px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.1s;
}

table caption {
  font-size: 1.5em;
  margin: 0.5em 0 0.75em;
}

table tr {
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  padding: 0.35em;
}

table th,
table td {
  padding: 0.625em;
  text-align: center;
}

table th {
  font-size: 0.95em;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

@media screen and (max-width: 600px) {
  .inputs-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  table {
    border: 0;
  }

  table caption {
    font-size: 1.3em;
  }

  table thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }

  table tr {
    border-bottom: 3px solid #ddd;
    display: block;
    margin-bottom: 0.625em;
  }

  table td {
    border-bottom: 1px solid #ddd;
    display: block;
    font-size: 0.8em;
    text-align: right;
  }

  table td::before {
    /*
    * aria-label has no advantage, it won't be read inside a table
    content: attr(aria-label);
    */
    content: attr(data-label);
    float: left;
    font-weight: bold;
    text-transform: uppercase;
  }

  table td:last-child {
    border-bottom: 0;
  }
}
</style>
