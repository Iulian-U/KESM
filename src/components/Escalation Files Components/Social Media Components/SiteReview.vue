<template>
  <a-config-provider :locale="enUS">
    <!-- header with inputs -->
    <div class="sticky top-0 z-40 shadow">
      <!-- Title container -->
      <div class="bg-white flex justify-center">
        <h2 class="text-2xl font-semibold py-1 mt-2">Site Review Tickets - Week</h2>
        <WeekDisplay class="text-2xl font-semibold py-1 ml-1 mt-2 text-indigo-600" />
      </div>

      <!-- Inputs Container -->
      <div class="inputs-container bg-white py-3 flex justify-around">
        <!-- Ticket Input -->
        <a-input
          placeholder="Ticket"
          :max="7"
          v-model="siteReviewStore.newRow.ticket"
          allow-clear
          :max-length="7"
          :style="{ width: '80px' }"
        />

        <!-- Date Received Input  -->
        <a-date-picker
          format="MM-DD-YYYY"
          placeholder="Received"
          v-model="siteReviewStore.newRow.dateReceived"
          :style="{ width: '110px' }"
        />

        <!-- CINT ID Input -->
        <a-input
          v-model="siteReviewStore.newRow.cintID"
          placeholder="CINT ID"
          allow-clear
          :max-length="10"
          :style="{ width: '80px' }"
        />

        <!-- Email Input -->
        <a-input
          v-model="siteReviewStore.newRow.email"
          placeholder="E-mail"
          allow-clear
          :style="{ width: '80px' }"
        />

        <!-- Website Input-->
        <a-select
          v-model="siteReviewStore.newRow.website"
          placeholder="Site"
          allow-clear
          allow-search
          :style="{ width: '80px' }"
        >
          <a-option>TrustPilot</a-option>
          <a-option>SurveyPolice</a-option>
          <a-option>SiteJabber</a-option>
          <a-option>N/A</a-option>
        </a-select>

        <!-- Detailed Issue Input -->
        <a-input
          v-model="siteReviewStore.newRow.detailedIssue"
          placeholder="Details"
          allow-clear
          :style="{ width: '100px' }"
        />

        <!--  Issue Input -->
        <a-input
          v-model="siteReviewStore.newRow.issue"
          placeholder="Issue"
          allow-clear
          :style="{ width: '100px' }"
        />

        <!-- CINT status input -->
        <a-select
          v-model="siteReviewStore.newRow.cintStatus"
          placeholder="Status"
          allow-clear
          allow-search
          :style="{ width: '100px' }"
        >
          <a-option>Active</a-option>
          <a-option>Bad Email</a-option>
          <a-option>Sleeping</a-option>
          <a-option>Inactive</a-option>
          <a-option>Banned</a-option>
          <a-option>Unsubscribed</a-option>
        </a-select>

        <!--  psReason1 Input -->
        <a-input
          v-model="siteReviewStore.newRow.psReason1"
          placeholder="psReason 1"
          allow-clear
          :style="{ width: '110px' }"
        />

        <!--  psReason2 Input -->
        <a-input
          v-model="siteReviewStore.newRow.psReason2"
          placeholder="psReason 2"
          allow-clear
          :style="{ width: '110px' }"
        />

        <!--  psReason3 Input -->
        <a-input
          v-model="siteReviewStore.newRow.psReason3"
          placeholder="psReason 3"
          allow-clear
          :style="{ width: '110px' }"
        />

        <!--  Resolution Input -->
        <a-input
          v-model="siteReviewStore.newRow.resolution"
          placeholder="Resolution"
          allow-clear
          :style="{ width: '100px' }"
        />

        <!--  Reactivated Input -->
        <a-select
          v-model="siteReviewStore.newRow.reactivated"
          placeholder="Reactivated?"
          allow-clear
          allow-search
          :style="{ width: '135px' }"
        >
          <a-option>Yes</a-option>
          <a-option>No</a-option>
        </a-select>

        <!--  Points Input -->
        <a-input
          v-model="siteReviewStore.newRow.pointsAwarded"
          placeholder="# Points"
          allow-clear
          :style="{ width: '100px' }"
        />

        <!-- Date Resolved Input  -->
        <a-date-picker
          format="MM-DD-YYYY"
          placeholder="Resolved"
          v-model="siteReviewStore.newRow.dateResolved"
          :style="{ width: '110px' }"
        />

        <!-- Add row button -->
        <a-button type="primary" @click="addNewRow()" :style="{ width: '80px' }">
          <template #icon>
            <icon-plus />
          </template>
          <template #default>Add</template>
        </a-button>
      </div>
    </div>

    <!-- Table with data -->
    <div>
      <table
        class="mx-auto mt-4 h-auto bg-white rounded-t-lg shadow"
        data-cols-width="15,15,15,25,25,30,30,15,15,15,15,30,15,15,15,20"
        ref="siteReviewTable"
      >
        <thead>
          <tr>
            <th data-f-bold="true">ZD Ticket Number</th>
            <th data-f-bold="true">Date received</th>
            <th data-f-bold="true">CINT ID</th>
            <th data-f-bold="true">E-mail address</th>
            <th data-f-bold="true">Social Media Site</th>
            <th data-f-bold="true">Detailed Issue</th>
            <th data-f-bold="true">Issue</th>
            <th data-f-bold="true">CINT Status</th>
            <th data-f-bold="true">psReason 1</th>
            <th data-f-bold="true">psReason 2</th>
            <th data-f-bold="true">psReason 3</th>
            <th data-f-bold="true">Resolution</th>
            <th data-f-bold="true">Reactivated?</th>
            <th data-f-bold="true"># Points awarded</th>
            <th data-f-bold="true">Date resolved</th>
            <th data-f-bold="true">Resolved by</th>

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

        <tbody v-for="row in siteReviewStore.rows" :key="row.id">
          <tr class="border">
            <td data-label="TICKET">
              <a-input v-model="row.ticket" :max-length="7" />
              <p class="hidden">{{ row.ticket }}</p>
            </td>

            <td data-label="DATE RECEIVED">
              <a-input v-model="row.dateReceived" :max-length="7" />
              <p class="hidden">{{ row.dateReceived }}</p>
            </td>

            <td data-label="CINT ID">
              <a-input v-model="row.cintID" :max-length="7" />
              <p class="hidden">{{ row.cintID }}</p>
            </td>

            <td data-label="E-MAIL ADDRESS">
              <a-input v-model="row.email" :max-length="7" />
              <p class="hidden">{{ row.email }}</p>
            </td>

            <td data-label="SOCIAL MEDIA SITE">
              <a-input v-model="row.website" :max-length="7" />
              <p class="hidden">{{ row.website }}</p>
            </td>

            <td data-label="DETAILED ISSUE">
              <a-input v-model="row.detailedIssue" :max-length="7" />
              <p class="hidden">{{ row.detailedIssue }}</p>
            </td>

            <td data-label="ISSUE">
              <a-input v-model="row.issue" :max-length="7" />
              <p class="hidden">{{ row.issue }}</p>
            </td>

            <td data-label="CINT STATUS">
              <a-input v-model="row.cintStatus" :max-length="7" />
              <p class="hidden">{{ row.cintStatus }}</p>
            </td>

            <td data-label="PSREASON 1">
              <a-input v-model="row.psReason1" :max-length="7" />
              <p class="hidden">{{ row.psReason1 }}</p>
            </td>

            <td data-label="PSREASON 2">
              <a-input v-model="row.psReason2" :max-length="7" />
              <p class="hidden">{{ row.psReason2 }}</p>
            </td>

            <td data-label="PSREASON 3">
              <a-input v-model="row.psReason3" :max-length="7" />
              <p class="hidden">{{ row.psReason3 }}</p>
            </td>

            <td data-label="RESOLUTION">
              <a-input v-model="row.resolution" :max-length="7" />
              <p class="hidden">{{ row.resolution }}</p>
            </td>

            <td data-label="REACTIVATED?">
              <a-input v-model="row.reactivated" :max-length="7" />
              <p class="hidden">{{ row.reactivated }}</p>
            </td>

            <td data-label="# POINTS AWARDED">
              <a-input v-model="row.pointsAwarded" :max-length="7" />
              <p class="hidden">{{ row.pointsAwarded }}</p>
            </td>

            <td data-label="DATE RESOLVED">
              <a-input v-model="row.dateResolved" :max-length="7" />
              <p class="hidden">{{ row.dateResolved }}</p>
            </td>

            <td data-label="RESOLVED BY">
              <a-input v-model="storeUser.fullName" />
              <p class="hidden">{{ storeUser.fullName }}</p>
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
      <div class="bg-white mx-auto mt-1 empty_data" v-show="siteReviewStore.rows.length === 0">
        <a-empty />
      </div>

      <!-- Floating button -->
      <div class="absolute bottom-10 z-50 mb-10 ml-10">
        <FloatingMenu
          @clear-data="openModal()"
          @download-data="
            convertTable(
              siteReviewTable,
              `Site Review Tickets Spreadsheet Week ${storeWeek.week} - ${storeUser.fullName}`
            )
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
import { useSiteReviewStore } from "../../../stores/Escalation_Files_Stores/Social_Media_Stores/siteReviewStore";

//Composables import
import getUser from "../../../composables/getUser";
import convertTableToExcel from "../../../composables/convertTableToExcel";

// Stores variables
const storeWeek = weekStore();
const storeUser = useUserStore();
const siteReviewStore = useSiteReviewStore();

// Destructuring userInfo composable
const { userInfo } = getUser();

// Table to excel destructuring
const { convertTable } = convertTableToExcel();

// Target the table
const siteReviewTable = ref(null);

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
  siteReviewStore.newRow.ticket = "";
  siteReviewStore.newRow.country = "";
  siteReviewStore.newRow.projectID = "";
  siteReviewStore.newRow.cintID = "";
  siteReviewStore.newRow.dummyID = "";
  siteReviewStore.newRow.date = "";
  siteReviewStore.newRow.pointsIssue = "";
  siteReviewStore.newRow.techIssue = "";
}

// Function to add new row to the table
function addNewRow() {
  siteReviewStore.$patch((state) => {
    state.newRow.id = Math.floor(Math.random() * 10000);
    state.rows.push(state.newRow);
    state.newRow = {
      ticket: "",
      country: "",
      peojectID: "",
      cintID: "",
      dummyID: "",
      date: "",
      pointsIssue: "",
      techIssue: "",
    };
    state.hasChanged = true;
  });
}

// Function to edit a row
function editRow() {
  siteReviewStore.$patch((state) => {
    state.selectedRow = state.rows.indexOf(state.newRow);
    state.newRow = {};
    state.hasChanged = true;
  });
}

// Function to delete a row
function deleteRow(id) {
  siteReviewStore.$patch((state) => {
    state.rows = state.rows.filter((row) => row.id !== id);
    state.hasChanged = true;
  });
}

// Function to clear all rows
function clearAllRows() {
  siteReviewStore.$patch((state) => {
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
