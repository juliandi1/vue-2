import $ from 'jquery';
import Tooltip from 'codex-tooltip';

const showToolTip = async (element, text) => {
    const tooltip = new Tooltip();
    const options = {
        placement: 'top'
    }

    tooltip.onHover(element, text, options);
    
    element.addEventListener('click', () => {
        tooltip.hide();
    });
}

const showAlert = async (type, message) => {
    let alert_class = '';

    if (type == 'success') {
        alert_class = 'fas fa-check text-success'
    } else if (type == 'error') {
        alert_class = 'fas fa-times text-danger';
    } else if (type == 'loading') {
        alert_class = 'fas fa-cog fa-spin text-primary';
    }
    
    return {
        type: type,
        message: message,
        class: alert_class
    };
}

const clearAllModal = async () => {
    $('.modal').remove();
}

function moneyFormat(angka){
    let number_string = angka.replace(/[^,\d]/g, '').toString();
    let split = number_string.split(',');
    let sisa = split[0].length % 3;
    let rupiah = split[0].substr(0, sisa);
    let ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    if (ribuan){
        let separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
    }

    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
    return rupiah ? 'Rp. ' + rupiah : '';
}

export { showToolTip, showAlert, clearAllModal, moneyFormat }