<script>
    export let label = "";
    export let checked = false;
    export let disabled = false;
  
    const toggle = () => {
      if (!disabled) checked = !checked;
    };
  </script>
  
  <label class="checkbox-container">
    <input type="checkbox" bind:checked {disabled} on:change={toggle} />
    <span class="checkmark"></span>
    {label}
  </label>
  
  <style>
    .checkbox-container {
      display: flex;
      align-items: center;
      cursor: pointer;
      user-select: none;
    }
  
    .checkbox-container input {
      display: none;
    }
  
    .checkmark {
      width: 20px;
      height: 20px;
      border: 2px solid #007bff;
      border-radius: 4px;
      display: inline-block;
      margin-right: 8px;
      position: relative;
    }
  
    .checkbox-container input:checked + .checkmark {
      background-color: #007bff;
      border-color: #007bff;
    }
  
    .checkbox-container input:checked + .checkmark::after {
      content: "";
      position: absolute;
      left: 6px;
      top: 2px;
      width: 5px;
      height: 10px;
      border: solid white;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }
  
    .checkbox-container input:disabled + .checkmark {
      border-color: #ccc;
      background-color: #f0f0f0;
      cursor: not-allowed;
    }
  </style>
  