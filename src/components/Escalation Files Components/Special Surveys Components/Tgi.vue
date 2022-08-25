<template>
  <a-config-provider :locale="enUS">
    <!-- header with inputs -->
    <div class="sticky top-0 z-40 shadow">
      <!-- Title container -->
      <div class="bg-white flex justify-center">
        <h2 class="text-2xl font-semibold py-1 mt-2">TGI - Week</h2>
        <WeekDisplay class="text-2xl font-semibold py-1 ml-1 mt-2 text-indigo-600" />
      </div>

      <!-- Inputs Container -->
      <div class="inputs-container bg-white py-3 flex justify-around">
        <!-- country Input-->
        <a-select
          v-model="tgiStore.newRow.country"
          placeholder="Select Country"
          allow-clear
          allow-search
          :style="{ width: '170px' }"
        >
          <a-option>France</a-option>
          <a-option>Germany</a-option>
          <a-option>Ireland</a-option>
          <a-option>UK</a-option>
        </a-select>

        <!-- CINT ID Input -->
        <a-input
          v-model="tgiStore.newRow.cintID"
          placeholder="CINT ID"
          allow-clear
          :max-length="10"
          :style="{ width: '170px' }"
        />

        <!-- Ticket Input -->
        <a-input
          placeholder="Ticket"
          :max="7"
          v-model="tgiStore.newRow.ticket"
          allow-clear
          :max-length="7"
          :style="{ width: '170px' }"
        />

        <!-- Project ID Input -->
        <a-input
          v-model="tgiStore.newRow.projectID"
          placeholder="Project ID"
          allow-clear
          :max-length="7"
          :style="{ width: '170px' }"
        />

        <!-- Member message Input -->
        <a-input
          v-model="tgiStore.newRow.panelistMessage"
          placeholder="Member Message"
          allow-clear
          :style="{ width: '170px' }"
        />

        <!-- Issue Input -->
        <a-input
          v-model="tgiStore.newRow.issue"
          placeholder="Issue"
          allow-clear
          :style="{ width: '170px' }"
        />

        <!-- Additional info Input -->
        <a-input
          v-model="tgiStore.newRow.additionalInfo"
          placeholder="Additional Info"
          allow-clear
          :style="{ width: '170px' }"
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
      <table
        class="mx-auto mt-4 h-auto bg-white rounded-t-lg shadow"
        data-cols-width="15,15,15,15,25,25,25"
        ref="tgiTable"
      >
        <thead>
          <tr>
            <th data-f-bold="true">Country</th>
            <th data-f-bold="true">CINT Panelist ID</th>
            <th data-f-bold="true">Ticket ID</th>
            <th data-f-bold="true">CINT Project ID</th>
            <th data-f-bold="true">Panel Member Message</th>
            <th data-f-bold="true">Issue</th>
            <th data-f-bold="true">Additional Info</th>

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

        <tbody v-for="row in tgiStore.rows" :key="row.id">
          <tr class="border">
            <td data-label="COUNTRY">
              <a-input v-model="row.country" />
              <p class="hidden">{{ row.country }}</p>
            </td>

            <td data-label="CINT PANELIST ID">
              <a-input v-model="row.cintID" :max-length="9" />
              <p class="hidden">{{ row.cintID }}</p>
            </td>

            <td data-label="TICKET ID">
              <a-input v-model="row.ticket" :max-length="7" />
              <p class="hidden">{{ row.ticket }}</p>
            </td>

            <td data-label="CINT PROJECT ID">
              <a-input v-model="row.projectID" :max-length="9" />
              <p class="hidden">{{ row.projectID }}</p>
            </td>

            <td data-label="PANEL MEMBER MESSAGE">
              <a-input v-model="row.panelistMessage" />
              <p class="hidden">{{ row.panelistMessage }}</p>
            </td>

            <td data-label="ISSUE">
              <a-input v-model="row.issue" />
              <p class="hidden">{{ row.issue }}</p>
            </td>

            <td data-label="ADDITIONAL INFO">
              <a-input v-model="row.additionalInfo" />
              <p class="hidden">{{ row.additionalInfo }}</p>
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
      <div class="bg-white mx-auto mt-1 empty_data" v-show="tgiStore.rows.length === 0">
        <a-empty />
      </div>

      <!-- Floating button -->
      <div class="absolute bottom-10 z-50 mb-10 ml-10">
        <FloatingMenu
          @clear-data="openModal()"
          @download-data="
            convertTable(
              tgiTable,
              `TGI Escalation file Week ${storeWeek.week} - ${storeUser.fullName}`
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
import { useTgiStore } from "../../../stores/Escalation_Files_Stores/Special_Projects_Stores/tgiStore";

//Composables import
import getUser from "../../../composables/getUser";
import convertTableToExcel from "../../../composables/convertTableToExcel";

// Stores variables
const storeWeek = weekStore();
const storeUser = useUserStore();
const tgiStore = useTgiStore();

// Destructuring userInfo composable
const { userInfo } = getUser();

// Table to excel destructuring
const { convertTable } = convertTableToExcel();

// Target the table
const tgiTable = ref(null);

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
  tgiStore.newRow.country = "";
  tgiStore.newRow.cintID = "";
  tgiStore.newRow.ticket = "";
  tgiStore.newRow.projectID = "";
  tgiStore.newRow.panelistMessage = "";
  tgiStore.newRow.issue = "";
  tgiStore.newRow.additionalInfo = "";
}

// Function to add new row to the table
function addNewRow() {
  tgiStore.$patch((state) => {
    state.newRow.id = Math.floor(Math.random() * 10000);
    state.rows.push(state.newRow);
    state.newRow = {
      country: "",
      cintID: "",
      ticket: "",
      projectID: "",
      panelistMessage: "",
      issue: "",
      additionalInfo: "",
    };
    state.hasChanged = true;
  });
}

// Function to edit a row
function editRow() {
  tgiStore.$patch((state) => {
    state.selectedRow = state.rows.indexOf(state.newRow);
    state.newRow = {};
    state.hasChanged = true;
  });
}

// Function to delete a row
function deleteRow(id) {
  tgiStore.$patch((state) => {
    state.rows = state.rows.filter((row) => row.id !== id);
    state.hasChanged = true;
  });
}

// Function to clear all rows
function clearAllRows() {
  tgiStore.$patch((state) => {
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
