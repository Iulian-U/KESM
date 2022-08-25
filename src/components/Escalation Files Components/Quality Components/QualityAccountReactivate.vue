<template>
  <a-config-provider :locale="enUS">
    <!-- header with inputs -->
    <div class="sticky top-0 z-40 shadow">
      <!-- Title container -->
      <div class="bg-white flex justify-center">
        <h2 class="text-2xl font-semibold py-1 mt-2">
          Accounts member services reactivates - Week
        </h2>
        <WeekDisplay class="text-2xl font-semibold py-1 ml-1 mt-2 text-indigo-600" />
      </div>

      <!-- Inputs Container -->
      <div class="inputs-container bg-white py-3 flex justify-around">
        <!-- Date submitted Input -->

        <a-date-picker
          format="MM-DD-YYYY"
          placeholder="Date Ticket Submitted"
          v-model="qualityReactivateStore.newRow.dateSubmitted"
          :style="{ width: '250px' }"
        />

        <!-- CINT ID Input -->

        <a-input
          v-model="qualityReactivateStore.newRow.cintID"
          placeholder="CINT ID"
          allow-clear
          :max-length="10"
          :style="{ width: '250px' }"
        />

        <!-- psReason Input -->
        <a-select
          v-model="qualityReactivateStore.newRow.psReason"
          placeholder="Select psReason"
          allow-clear
          allow-search
          :style="{ width: '250px' }"
        >
          <a-option>104</a-option>
          <a-option>501</a-option>
          <a-option>502</a-option>
          <a-option>503</a-option>
          <a-option>505</a-option>
          <a-option>506</a-option>
          <a-option>508</a-option>
          <a-option>599</a-option>
          <a-option>601</a-option>
          <a-option>602</a-option>
          <a-option>605</a-option>
          <a-option>606</a-option>
          <a-option>609</a-option>
          <a-option>610</a-option>
          <a-option>611</a-option>
          <a-option>699</a-option>
          <a-option>702</a-option>
          <a-option>704</a-option>
          <a-option>711</a-option>
          <a-option>713</a-option>
        </a-select>

        <!-- Ticket Input -->

        <a-input
          placeholder="Ticket"
          :max="7"
          v-model="qualityReactivateStore.newRow.ticket"
          allow-clear
          :max-length="7"
          :style="{ width: '250px' }"
        />

        <!-- Date Reactivated Input -->

        <a-date-picker
          format="MM-DD-YYYY"
          placeholder="Date Account Reactivated"
          v-model="qualityReactivateStore.newRow.dateReactivated"
          :style="{ width: '250px' }"
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
        data-cols-width="22,15,15,15,25"
        ref="reactivateTable"
      >
        <thead>
          <tr>
            <th data-f-bold="true">Date Ticket Submitted</th>
            <th data-f-bold="true">Ticket</th>
            <th data-f-bold="true">CINT ID</th>
            <th data-f-bold="true">psReason</th>
            <th data-f-bold="true">Date Account Reactivated</th>

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

        <tbody v-for="row in qualityReactivateStore.rows" :key="row.id">
          <tr class="border">
            <td data-label="DATE ACCOUNT REACTIVATED">
              <a-input v-model="row.dateSubmitted" />
              <p class="hidden">{{ row.dateSubmitted }}</p>
            </td>

            <td data-label="TICKET">
              <a-input v-model="row.ticket" :max-length="7" />
              <p class="hidden">{{ row.ticket }}</p>
            </td>

            <td data-label="CINT ID">
              <a-input v-model="row.cintID" :max-length="9" />
              <p class="hidden">{{ row.cintID }}</p>
            </td>

            <td data-label="PSREASON">
              <a-input v-model="row.psReason" />
              <p class="hidden">{{ row.psReason }}</p>
            </td>

            <td data-label="DATE ACCOUNT REACTIVATED">
              <a-input v-model="row.dateReactivated" />
              <p class="hidden">{{ row.dateReactivated }}</p>
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
      <div
        class="bg-white mx-auto mt-1 empty_data"
        v-show="qualityReactivateStore.rows.length === 0"
      >
        <a-empty />
      </div>

      <!-- Floating button -->
      <div class="absolute bottom-10 z-50 mb-10 ml-10">
        <FloatingMenu
          @clear-data="openModal()"
          @download-data="
            convertTable(
              reactivateTable,
              `Account Member Services Reactivates Week ${storeWeek.week} - ${storeUser.fullName}`
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
import { useQualityReactivate } from "../../../stores/Escalation_Files_Stores/Quality_Stores/qualityAccountReactivate";

//Composables import
import getUser from "../../../composables/getUser";
import convertTableToExcel from "../../../composables/convertTableToExcel";

// Stores variables
const storeWeek = weekStore();
const storeUser = useUserStore();
const qualityReactivateStore = useQualityReactivate();

// Destructuring userInfo composable
const { userInfo } = getUser();

// Table to excel destructuring
const { convertTable } = convertTableToExcel();

// Target the table
const reactivateTable = ref(null);

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
  qualityReactivateStore.newRow.dateSubmitted = "";
  qualityReactivateStore.newRow.ticket = "";
  qualityReactivateStore.newRow.cintID = "";
  qualityReactivateStore.newRow.psReason = "";
  qualityReactivateStore.newRow.dateReactivated = "";
}

// Function to add new row to the table
function addNewRow() {
  qualityReactivateStore.$patch((state) => {
    state.newRow.id = Math.floor(Math.random() * 10000);
    state.rows.push(state.newRow);
    state.newRow = {
      dateSubmitted: "",
      ticket: "",
      cintID: "",
      psReason: "",
      dateReactivated: "",
    };
    state.hasChanged = true;
  });
}

// Function to edit a row
function editRow() {
  qualityReactivateStore.$patch((state) => {
    state.selectedRow = state.rows.indexOf(state.newRow);
    state.newRow = {};
    state.hasChanged = true;
  });
}

// Function to delete a row
function deleteRow(id) {
  qualityReactivateStore.$patch((state) => {
    state.rows = state.rows.filter((row) => row.id !== id);
    state.hasChanged = true;
  });
}

// Function to clear all rows
function clearAllRows() {
  qualityReactivateStore.$patch((state) => {
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
