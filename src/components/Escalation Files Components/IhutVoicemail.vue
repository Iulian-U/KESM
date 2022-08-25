<template>
  <a-config-provider :locale="enUS">
    <!-- header with inputs -->
    <div class="sticky top-0 z-40 shadow">
      <!-- Title container -->
      <div class="bg-white flex justify-center">
        <h2 class="text-2xl font-semibold py-1 mt-2">IHUT Voicemail LOG - Week</h2>
        <WeekDisplay class="text-2xl font-semibold py-1 ml-1 mt-2 text-indigo-600" />
      </div>

      <!-- Inputs Container -->
      <div class="inputs-container bg-white py-3 flex justify-around">
        <!-- Date of voicemail Input -->
        <a-date-picker format="MM-DD-YYYY" placeholder="Date of voicemail" v-model="ihutVoicemailStore.newRow.dateVoicemail" :style="{ width: '200px' }" />

        <!-- Name Input -->

        <a-input placeholder="Name" v-model="ihutVoicemailStore.newRow.name" allow-clear :style="{ width: '200px' }" />

        <!-- E-mail address Input -->

        <a-input placeholder="E-mail address" v-model="ihutVoicemailStore.newRow.email" allow-clear :style="{ width: '200px' }" />

        <!-- Survey Number Input -->

        <a-input placeholder="Survey Number" :max="7" v-model="ihutVoicemailStore.newRow.surveyNumber" allow-clear :max-length="7" :style="{ width: '200px' }" />

        <!-- Question/conern Input -->

        <a-input placeholder="Question/Concern" v-model="ihutVoicemailStore.newRow.concern" allow-clear :style="{ width: '200px' }" />

        <!-- Ticket Input -->

        <a-input placeholder="Ticket ID" :max="7" v-model="ihutVoicemailStore.newRow.ticket" allow-clear :max-length="7" :style="{ width: '200px' }" />

        <!-- Date responded Input -->

        <a-date-picker format="MM-DD-YYYY" placeholder="Date responded" v-model="ihutVoicemailStore.newRow.dateResponded" :style="{ width: '200px' }" />

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
      <table class="mx-auto mt-4 h-auto bg-white rounded-t-lg shadow" ref="ihutVoicemailTable" data-cols-width="20,15,20,15,30,15,20">
        <thead>
          <tr>
            <th data-f-bold="true">Date of voicemail</th>
            <th data-f-bold="true">Name</th>
            <th data-f-bold="true">E-mail address</th>
            <th data-f-bold="true">Survey Number</th>
            <th data-f-bold="true">Question/Concern</th>
            <th data-f-bold="true">Ticket ID</th>
            <th data-f-bold="true">Date Responded</th>

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

        <tbody v-for="row in ihutVoicemailStore.rows" :key="row.id">
          <tr class="border">
            <td data-label="DATE OF VOICEMAIL">
              <a-input v-model="row.dateVoicemail" />
              <p class="hidden">{{ row.dateVoicemail }}</p>
            </td>

            <td data-label="NAME">
              <a-input v-model="row.name" />
              <p class="hidden">{{ row.name }}</p>
            </td>

            <td data-label="E-MAIL ADDRESS">
              <a-input v-model="row.email" />
              <p class="hidden">{{ row.email }}</p>
            </td>

            <td data-label="SURVEY NUMBER">
              <a-input v-model="row.surveyNumber" />
              <p class="hidden">{{ row.surveyNumber }}</p>
            </td>
            <td data-label="QUESTION/CONCERN">
              <a-input v-model="row.concern" />
              <p class="hidden">{{ row.concern }}</p>
            </td>

            <td data-label="TICKET ID">
              <a-input v-model="row.ticket" />
              <p class="hidden">{{ row.ticket }}</p>
            </td>

            <td data-label="DATE RESPONDED">
              <a-input v-model="row.dateResponded" />
              <p class="hidden">{{ row.dateResponded }}</p>
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
      <div class="bg-white mx-auto mt-1 empty_data" v-show="ihutVoicemailStore.rows.length === 0">
        <a-empty />
      </div>

      <!-- Floating button -->
      <div class="absolute bottom-10 z-50 mb-10 ml-10">
        <FloatingMenu @clear-data="openModal()" @download-data="convertTable(ihutVoicemailTable, `iHUT Voicemail Log Week ${storeWeek.week} - ${storeUser.fullName}`)" />
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
import FloatingMenu from "../../components/FloatingMenu.vue";
import WeekDisplay from "../../components/WeekDisplay.vue";

// Stores import
import { useUserStore } from "../../stores/userInfo";
import { weekStore } from "../../stores/weekStore";
import { useIhutVoicemailStore } from "../../stores/Escalation_Files_Stores/ihutVoicemail";

//Composables import
import getUser from "../../composables/getUser";
import convertTableToExcel from "../../composables/convertTableToExcel";

// Stores variables
const storeWeek = weekStore();
const storeUser = useUserStore();
const ihutVoicemailStore = useIhutVoicemailStore();

// Destructuring userInfo composable
const { userInfo } = getUser();

// Table to excel destructuring
const { convertTable } = convertTableToExcel();

// Target the table
const ihutVoicemailTable = ref(null);

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
  ihutVoicemailStore.dateVoicemail = "";
  ihutVoicemailStore.name = "";
  ihutVoicemailStore.email = "";
  ihutVoicemailStore.surveyNumber = "";
  ihutVoicemailStore.concern = "";
  ihutVoicemailStore.ticket = "";
  ihutVoicemailStore.dateResponded = "";
}

// Function to add new row to the table
function addNewRow() {
  ihutVoicemailStore.$patch((state) => {
    state.newRow.id = Math.floor(Math.random() * 10000);
    state.rows.push(state.newRow);
    state.newRow = {
      id: "",
      dateVoicemail: "",
      name: "",
      email: "",
      surveyNumber: "",
      concern: "",
      ticket: "",
      dateResponded: "",
    };
    state.hasChanged = true;
  });
}

// Function to edit a row
function editRow() {
  ihutVoicemailStore.$patch((state) => {
    state.selectedRow = state.rows.indexOf(state.newRow);
    state.newRow = {};
    state.hasChanged = true;
  });
}

// Function to delete a row
function deleteRow(id) {
  ihutVoicemailStore.$patch((state) => {
    state.rows = state.rows.filter((row) => row.id !== id);
    state.hasChanged = true;
  });
}

// Function to clear all rows
function clearAllRows() {
  ihutVoicemailStore.$patch((state) => {
    state.rows = [];
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
