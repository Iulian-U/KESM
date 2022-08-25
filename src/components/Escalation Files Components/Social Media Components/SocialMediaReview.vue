<template>
  <a-config-provider :locale="enUS">
    <!-- header with inputs -->
    <div class="sticky top-0 z-40 shadow">
      <!-- Title container -->
      <div class="bg-white flex justify-center">
        <h2 class="text-2xl font-semibold py-1 mt-2">Social Media Review Tickets - Week</h2>
        <WeekDisplay class="text-2xl font-semibold py-1 ml-1 mt-2 text-indigo-600" />
      </div>

      <!-- Inputs Container -->
      <div class="inputs-container bg-white py-3 flex justify-around">
        <!-- Ticket Input -->
        <a-input
          placeholder="Ticket"
          :max="7"
          v-model="socialReviewStore.newRow.ticket"
          allow-clear
          :max-length="7"
          :style="{ width: '130px' }"
        />

        <!-- Date Received Input  -->
        <a-date-picker
          format="MM-DD-YYYY"
          placeholder="Received"
          v-model="socialReviewStore.newRow.dateReceived"
          :style="{ width: '130px' }"
        />

        <!-- CINT ID Input -->
        <a-input
          v-model="socialReviewStore.newRow.cintID"
          placeholder="CINT ID"
          allow-clear
          :max-length="10"
          :style="{ width: '130px' }"
        />

        <!-- Website Input-->
        <a-select
          v-model="socialReviewStore.newRow.website"
          placeholder="Site"
          allow-clear
          allow-search
          :style="{ width: '130px' }"
        >
          <a-option>TrustPilot</a-option>
          <a-option>SurveyPolice</a-option>
          <a-option>SiteJabber</a-option>
          <a-option>N/A</a-option>
        </a-select>

        <!-- Detailed Issue Input -->
        <a-input
          v-model="socialReviewStore.newRow.issue"
          placeholder="Issue"
          allow-clear
          :style="{ width: '130px' }"
        />

        <!--  Resolution Input -->
        <a-input
          v-model="socialReviewStore.newRow.resolution"
          placeholder="Resolution"
          allow-clear
          :style="{ width: '130px' }"
        />

        <!--  Points Input -->
        <a-input
          v-model="socialReviewStore.newRow.pointsAwarded"
          placeholder="# Points"
          allow-clear
          :style="{ width: '130px' }"
        />

        <!-- Rating at ticket submission input -->
        <a-select
          v-model="socialReviewStore.newRow.initialRating"
          placeholder="Initial rating"
          allow-clear
          allow-search
          :style="{ width: '135px' }"
        >
          <a-option>★</a-option>
          <a-option>★★</a-option>
          <a-option>★★★</a-option>
          <a-option>★★★★</a-option>
          <a-option>★★★★★</a-option>
        </a-select>

        <!-- Rating after resolution input -->
        <a-select
          v-model="socialReviewStore.newRow.finalRating"
          placeholder="Final rating"
          allow-clear
          allow-search
          :style="{ width: '130px' }"
        >
          <a-option>★</a-option>
          <a-option>★★</a-option>
          <a-option>★★★</a-option>
          <a-option>★★★★</a-option>
          <a-option>★★★★★</a-option>
        </a-select>

        <!-- Date Resolved Input  -->
        <a-date-picker
          format="MM-DD-YYYY"
          placeholder="Resolved"
          v-model="socialReviewStore.newRow.dateResolved"
          :style="{ width: '130px' }"
        />

        <!--  Notes Input -->
        <a-input
          v-model="socialReviewStore.newRow.notes"
          placeholder="Notes"
          allow-clear
          :style="{ width: '130px' }"
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
        data-cols-width="15,15,15,30,30,15,15,15,15,20,30"
        ref="socialReviewTable"
      >
        <thead>
          <tr>
            <th data-f-bold="true">ZD Ticket Number</th>
            <th data-f-bold="true">Date Received</th>
            <th data-f-bold="true">Review Site</th>
            <th data-f-bold="true">Issue</th>
            <th data-f-bold="true">Resolution</th>
            <th data-f-bold="true"># Points awarded</th>
            <th data-f-bold="true">Rating at ticket submission</th>
            <th data-f-bold="true">Rating after resolution</th>
            <th data-f-bold="true">Date resolved</th>
            <th data-f-bold="true">Resolved by</th>
            <th data-f-bold="true">Notes</th>

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

        <tbody v-for="row in socialReviewStore.rows" :key="row.id">
          <tr class="border">
            <td data-label="TICKET">
              <a-input v-model="row.ticket" :max-length="7" />
              <p class="hidden">{{ row.ticket }}</p>
            </td>

            <td data-label="DATE RECEIVED">
              <a-input v-model="row.dateReceived" :max-length="7" />
              <p class="hidden">{{ row.dateReceived }}</p>
            </td>

            <td data-label="REVIEW SITE">
              <a-input v-model="row.website" :max-length="7" />
              <p class="hidden">{{ row.website }}</p>
            </td>

            <td data-label="ISSUE">
              <a-input v-model="row.issue" :max-length="7" />
              <p class="hidden">{{ row.issue }}</p>
            </td>

            <td data-label="RESOLUTION">
              <a-input v-model="row.resolution" :max-length="7" />
              <p class="hidden">{{ row.resolution }}</p>
            </td>

            <td data-label="# POINTS AWARDED">
              <a-input v-model="row.pointsAwarded" :max-length="7" />
              <p class="hidden">{{ row.pointsAwarded }}</p>
            </td>

            <td data-label="RATING AT TICKET SUBMISSION">
              <a-input v-model="row.initialRating" :max-length="7" />
              <p class="hidden">{{ row.initialRating }}</p>
            </td>

            <td data-label="RATING AFTER RESOLUTION">
              <a-input v-model="row.finalRating" :max-length="7" />
              <p class="hidden">{{ row.finalRating }}</p>
            </td>

            <td data-label="DATE RESOLVED">
              <a-input v-model="row.dateResolved" :max-length="7" />
              <p class="hidden">{{ row.dateResolved }}</p>
            </td>

            <td data-label="RESOLVED BY">
              <a-input v-model="storeUser.fullName" />
              <p class="hidden">{{ storeUser.fullName }}</p>
            </td>

            <td data-label="NOTES">
              <a-input v-model="row.notes" :max-length="7" />
              <p class="hidden">{{ row.notes }}</p>
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
      <div class="bg-white mx-auto mt-1 empty_data" v-show="socialReviewStore.rows.length === 0">
        <a-empty />
      </div>

      <!-- Floating button -->
      <div class="absolute bottom-10 z-50 mb-10 ml-10">
        <FloatingMenu
          @clear-data="openModal()"
          @download-data="
            convertTable(
              socialReviewTable,
              `Social Media Review Tickets Spreadsheet  Week ${storeWeek.week} - ${storeUser.fullName}`
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
import { useSocialReviewStore } from "../../../stores/Escalation_Files_Stores/Social_Media_Stores/socialMediaReviewStore";

//Composables import
import getUser from "../../../composables/getUser";
import convertTableToExcel from "../../../composables/convertTableToExcel";

// Stores variables
const storeWeek = weekStore();
const storeUser = useUserStore();
const socialReviewStore = useSocialReviewStore();

// Destructuring userInfo composable
const { userInfo } = getUser();

// Table to excel destructuring
const { convertTable } = convertTableToExcel();

// Target the table
const socialReviewTable = ref(null);

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
  socialReviewStore.newRow.ticket = "";
  socialReviewStore.newRow.dateReceived = "";
  socialReviewStore.newRow.website = "";
  socialReviewStore.newRow.issue = "";
  socialReviewStore.newRow.resolution = "";
  socialReviewStore.newRow.pointsAwarded = "";
  socialReviewStore.newRow.initialRating = "";
  socialReviewStore.newRow.finalRating = "";
  socialReviewStore.newRow.dateResolved = "";
  socialReviewStore.newRow.notes = "";
}

// Function to add new row to the table
function addNewRow() {
  socialReviewStore.$patch((state) => {
    state.newRow.id = Math.floor(Math.random() * 10000);
    state.rows.push(state.newRow);
    state.newRow = {
      id: "",
      ticket: "",
      dateReceived: "",
      website: "",
      issue: "",
      resolution: "",
      pointsAwarded: "",
      initialRating: "",
      finalRating: "",
      dateResolved: "",
      notes: "",
    };
    state.hasChanged = true;
  });
}

// Function to edit a row
function editRow() {
  socialReviewStore.$patch((state) => {
    state.selectedRow = state.rows.indexOf(state.newRow);
    state.newRow = {};
    state.hasChanged = true;
  });
}

// Function to delete a row
function deleteRow(id) {
  socialReviewStore.$patch((state) => {
    state.rows = state.rows.filter((row) => row.id !== id);
    state.hasChanged = true;
  });
}

// Function to clear all rows
function clearAllRows() {
  socialReviewStore.$patch((state) => {
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
