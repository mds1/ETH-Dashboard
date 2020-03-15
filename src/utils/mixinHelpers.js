export default {
  methods: {
    /**
     * @notice Takes in a number and returns a string version formatted as a currency
     * @param {number, string} value the number to be formatted
     * @param {boolean} showDollarSign true to prefix with a plus sign, false otherwise
     * @param {number} minDigits minimum number of decimal places to show
     * @param {number} maxDigits minimum number of decimal places to show
     * @returns {string} the value formatted as a currency
     */
    formatCurrency(
      value,
      showDollarSign = false,
      minDigits = 2,
      maxDigits = 4,
    ) {
      // Convert to a number if given a string
      let numberValue = typeof value === 'string' ? Number(value) : value;
      // Fix floating point error for numbers near zero
      numberValue = numberValue < 0 && numberValue > -1e-6 ? 0 : numberValue;
      const isNegative = numberValue < 0;
      // Format number
      if (
        numberValue === undefined
        || numberValue === null
        || Number.isNaN(numberValue)
      ) {
        return '$-';
      }
      const dollarAmount = numberValue.toLocaleString(undefined, {
        minimumFractionDigits: minDigits,
        maximumFractionDigits: maxDigits,
      });
      if (isNegative && showDollarSign) {
        return `-$${Math.abs(dollarAmount)}`;
      }
      if (isNegative) {
        return `-${Math.abs(dollarAmount)}`;
      }
      if (showDollarSign) {
        return `$${dollarAmount}`;
      }
      return `${dollarAmount}`;
    },

    /**
     * @notice Takes in a number and returns a string version formatted as a percent
     * @param {number, string} value the number to be formatted, e.g. input 3.5 for 3.5%
     * @param {boolean} showPlusSign true to prefix with a plus sign, false otherwise
     * @param {number} maxNumDigits maximum number of digits to show, use 2 to force 2
     * @returns {string} the value formatted as a percent
     */
    formatPercent(value, showPlusSign = true, maxNumDigits = 4) {
      // Return a dash if given an undefined value
      if (value === undefined || value === null || Number.isNaN(value)) {
        return '-%';
      }

      // Convert to a number if given a string
      const numberValue = typeof value === 'string' ? Number(value) * 100 : value * 100;
      if (
        numberValue === undefined
        || numberValue === null
        || Number.isNaN(value)
      ) {
        return '-%';
      }
      const percent = numberValue.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: maxNumDigits,
      });
      return showPlusSign ? `+${percent}%` : `${percent}%`;
    },
  },
};
