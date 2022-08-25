<template>
  <a-config-provider :locale="enUS">
    <!-- header with inputs -->
    <div class="sticky top-0 z-40 shadow">
      <!-- Title container -->
      <div class="bg-white flex justify-center">
        <h2 class="text-2xl font-semibold py-1 mt-2">AllGlobal Survey Escalation</h2>
      </div>

      <!-- Escalation info Inputs Container -->
      <div class="inputs-container bg-white py-3 flex justify-around">
        <div class="flex justify-center items-center font-semibold px-6">
          <p>Escalation info:</p>
        </div>
        <!-- Escalation subject Input -->
        <a-input placeholder="Escalation Subject" v-model="agSurveyEscalationStore.newSubject" allow-clear :style="{ width: '300px' }" />

        <!-- Panel Input-->
        <a-select v-model="agSurveyEscalationStore.newAgPanel" placeholder="Select AG Panel" allow-clear allow-search :style="{ width: '300px' }">
          <a-option>Allglobal Australia</a-option>
          <a-option>Allglobal Austria</a-option>
          <a-option>Allglobal Belgium-Dutch</a-option>
          <a-option>Allglobal Belgium-French</a-option>
          <a-option>Allglobal Brazil</a-option>
          <a-option>Allglobal Bulgaria</a-option>
          <a-option>Allglobal Denmark</a-option>
          <a-option>Allglobal Finland</a-option>
          <a-option>Allglobal France</a-option>
          <a-option>Allglobal Germany</a-option>
          <a-option>Allglobal Greece</a-option>
          <a-option>Allglobal Italy</a-option>
          <a-option>Allglobal Mexico</a-option>
          <a-option>Allglobal Netherlands</a-option>
          <a-option>Allglobal Norway</a-option>
          <a-option>Allglobal Poland</a-option>
          <a-option>Allglobal Portugal</a-option>
          <a-option>Allglobal Russia</a-option>
          <a-option>Allglobal Schweiz</a-option>
          <a-option>Allglobal Solvenia</a-option>
          <a-option>Allglobal Spain</a-option>
          <a-option>Allglobal Sweden</a-option>
          <a-option>Allglobal UK</a-option>
          <a-option>Allglobal USA</a-option>
        </a-select>

        <!-- Survey number Input -->
        <a-input placeholder="Survey Number" v-model="agSurveyEscalationStore.newSurveyNumber" allow-clear :style="{ width: '300px' }" />

        <!-- Synpsis of issue Input -->
        <a-input placeholder="Synopsis of issue" v-model="agSurveyEscalationStore.newSynopsis" allow-clear :style="{ width: '300px' }" />

        <!-- Add info button -->
        <a-button type="primary" @click="addEscalationInfo()" :style="{ width: '100px' }">
          <template #icon>
            <icon-plus />
          </template>
          <template #default>Set</template>
        </a-button>
      </div>

      <!-- Inputs Container -->
      <div class="inputs-container bg-white py-3 flex justify-around">
        <div class="flex justify-center items-center font-semibold px-5">
          <p>Add example(s):</p>
        </div>
        <!-- Ticket Input -->
        <a-input placeholder="Ticket" :max="7" v-model="agSurveyEscalationStore.newRow.ticket" allow-clear :max-length="7" :style="{ width: '300px' }" />

        <!-- Panelis ID Input -->
        <a-input v-model="agSurveyEscalationStore.newRow.panelistID" placeholder="Panelist ID" allow-clear :style="{ width: '300px' }" />

        <!-- Date Input  -->
        <a-date-picker format="MM-DD-YYYY" placeholder="Date received" v-model="agSurveyEscalationStore.newRow.dateReceived" :style="{ width: '300px' }" />

        <!-- Panelist wrote Input -->
        <a-input v-model="agSurveyEscalationStore.newRow.panelistWrote" placeholder="Panelist wrote" allow-clear :style="{ width: '300px' }" />

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
            <h2 class="text-xl py-2 ml-1 text-red-500 font-semibold italic">{{ agSurveyEscalationStore.subject }}</h2>
          </div>

          <!-- AG Panel-->
          <div class="flex">
            <h2 class="text-base py-2">AG Panel:</h2>
            <h2 class="text-base py-2 ml-1 text-red-500 font-semibold italic">{{ agSurveyEscalationStore.agPanel }}</h2>
          </div>

          <!-- Survey number-->
          <div class="flex">
            <h2 class="text-base py-2">Survey Number:</h2>
            <h2 class="text-base py-2 ml-1 text-red-500 font-semibold italic">{{ agSurveyEscalationStore.surveyNumber }}</h2>
          </div>

          <!-- Synopsis of issue -->
          <div class="flex">
            <h2 class="text-base py-2 font-semibold">Synopsis of issue:</h2>
            <h2 class="text-base py-2 ml-1 text-red-500 font-semibold italic">{{ agSurveyEscalationStore.synopsis }}</h2>
          </div>
        </div>
      </div>
      <table class="mx-auto mt-4 h-auto bg-white rounded-t-lg shadow" data-cols-width="30,30,30,30" ref="agEscalationTable">
        <thead>
          <div class="hidden">
            <tr>
              <th>Hello,</th>
            </tr>

            <!-- Blank space -->
            <tr>
              <td></td>
            </tr>

            <!-- AG Panel -->
            <tr>
              <th data-f-bold="true">AG Panel:</th>
              <td data-f-bold="true" data-f-color="FF0000" data-a-h="center">{{ agSurveyEscalationStore.subject }}</td>
            </tr>

            <!-- Blank space -->
            <tr>
              <td></td>
            </tr>

            <!-- Survey Number -->
            <tr>
              <th data-f-bold="true">Survey Number:</th>
              <td data-f-bold="true" data-f-color="FF0000" data-a-h="center">{{ agSurveyEscalationStore.surveyNumber }}</td>
            </tr>

            <!-- Blank space -->
            <tr>
              <td></td>
            </tr>

            <!-- Synopsis of issue -->
            <tr>
              <th data-f-bold="true">Synopsis of issue</th>
              <td data-f-bold="true" data-f-color="FF0000" data-a-h="center">{{ agSurveyEscalationStore.synopsis }}</td>
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
            <th data-f-bold="true">Panelist wrote</th>

            <th data-exclude="true">
              <div class="flex justify-center">
                <p>Edit</p>
                <a-tooltip content="You can edit any value by clicking on it. Then to update it, simply click on the 'Update' button.">
                  <vue-feather type="info" size="13" class="ml-1"></vue-feather>
                </a-tooltip>
              </div>
            </th>
            <th data-exclude="true">Delete</th>
          </tr>
        </thead>

        <tbody v-for="row in agSurveyEscalationStore.rows" :key="row.id">
          <tr class="border">
            <td data-label="TICKET">
              <a-input v-model="row.ticket" :max-length="7" />
              <p class="hidden">{{ row.ticket }}</p>
            </td>

            <td data-label="PANELIST ID">
              <a-input v-model="row.panelistID" />
              <p class="hidden">{{ row.panelistID }}</p>
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
        </tbody>
      </table>

      <!-- Empty data display -->
      <div class="bg-white mx-auto mt-1 empty_data" v-show="agSurveyEscalationStore.rows.length === 0">
        <a-empty />
      </div>

      <!-- Floating button -->
      <div class="absolute bottom-10 z-50 mb-10 ml-10">
        <FloatingMenu @clear-data="openModal()" @download-data="convertTable(agEscalationTable, `${agSurveyEscalationStore.subject}`)" />
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
import { IconPlus, IconDelete, IconDownload, IconBug, IconBulb, IconClose, IconMessage, IconEdit, IconSettings, IconRefresh } from "@arco-design/web-vue/es/icon";

// Vue imports
import { onMounted, ref } from "@vue/runtime-core";

// Components import
import FloatingMenu from "../../FloatingMenu.vue";
import WeekDisplay from "../../WeekDisplay.vue";

// Stores import
import { useUserStore } from "../../../stores/userInfo";
import { weekStore } from "../../../stores/weekStore";
import { useAgSurveyEscalationStore } from "../../../stores/Escalation_Files_Stores/Survey Escalation_Stores/agSurveyEscalation";

//Composables import
import getUser from "../../../composables/getUser";
import convertTableToExcel from "../../../composables/convertTableToExcel";

// Stores variables
const storeWeek = weekStore();
const storeUser = useUserStore();
const agSurveyEscalationStore = useAgSurveyEscalationStore();

// Destructuring userInfo composable
const { userInfo } = getUser();

// Table to excel destructuring
const { convertTable } = convertTableToExcel();

// Target the table
const agEscalationTable = ref(null);

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
  agSurveyEscalationStore.newRow.ticket = "";
  agSurveyEscalationStore.newRow.panelistID = "";
  agSurveyEscalationStore.newRow.dateReceived = "";
  agSurveyEscalationStore.newRow.panelistWrote = "";
  agSurveyEscalationStore.newSubject = "";
  agSurveyEscalationStore.newAgPanel = "";
  agSurveyEscalationStore.newSurveyNumber = "";
  agSurveyEscalationStore.newSynopsis = "";
}

// Function to add new row to the table
function addNewRow() {
  agSurveyEscalationStore.$patch((state) => {
    state.newRow.id = Math.floor(Math.random() * 10000);
    state.rows.push(state.newRow);
    state.newRow = {
      ticket: "",
      panelistID: "",
      dateReceived: "",
      panelistWrote: "",
    };
    state.hasChanged = true;
  });
}

// Function to edit a row
function editRow() {
  agSurveyEscalationStore.$patch((state) => {
    state.selectedRow = state.rows.indexOf(state.newRow);
    state.newRow = {};
    state.hasChanged = true;
  });
}

// Function to add escalation info
function addEscalationInfo() {
  agSurveyEscalationStore.$patch((state) => {
    state.subject = state.newSubject;
    state.agPanel = state.newAgPanel;
    state.surveyNumber = state.newSurveyNumber;
    state.synopsis = state.newSynopsis;
    state.newSubject = "";
    state.newAgPanel = "";
    state.newSurveyNumber = "";
    state.newSynopsis = "";
    state.hasChanged = true;
  });
}

// Function to delete a row
function deleteRow(id) {
  agSurveyEscalationStore.$patch((state) => {
    state.rows = state.rows.filter((row) => row.id !== id);
    state.hasChanged = true;
  });
}

// Function to clear all rows
function clearAllRows() {
  agSurveyEscalationStore.$patch((state) => {
    state.rows = [];
    state.subject = "";
    state.agPanel = "";
    state.surveyNumber = "";
    state.synopsis = "";
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
